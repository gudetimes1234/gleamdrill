//// Schema migrations, embedded as Gleam rather than read from `.sql` files.
////
//// A compiled OTP release ships no source tree, so reading migrations off
//// disk at boot would mean shipping and locating a `priv` directory.
//// Embedding removes that failure mode, and matches how the rest of this repo
//// handles content (see `src/gleamdrill/problems/embedded.gleam`).
////
//// Each migration is a LIST of statements, not one blob: pog talks Postgres'
//// extended protocol, which rejects multiple statements in a single query.
//// Splitting them here is also safer than splitting on `;` at runtime.
////
//// Migrations apply in ascending `version` order, exactly once each, inside a
//// transaction. Never edit an applied migration -- add another.

pub type Migration {
  Migration(version: Int, name: String, statements: List(String))
}

pub fn all() -> List(Migration) {
  [
    Migration(1, "init", init),
    Migration(2, "seeded_cards_have_a_rep", backfill),
    Migration(3, "notes", notes),
    Migration(4, "recall_reviews", recall_reviews),
    Migration(5, "review_snapshots", review_snapshots),
    Migration(6, "reminders", reminders),
    Migration(7, "queues", queues),
    Migration(8, "tracks", tracks),
    Migration(9, "settings_is_account_wide", settings_is_account_wide),
  ]
}

/// The other half of migration 8: drop what moved to `track_settings`.
///
/// `settings` keeps only the account-wide knobs -- timezone, day_start_hour,
/// reminder_hour. Nothing in this release reads the eight dropped columns
/// (migration 8's backfill ran before this and read them for the last time),
/// and signup stopped inserting them in the same release.
///
/// DEPLOY NOTE: 8 and 9 shipping in one release means the deploy must not
/// roll. The currently-live release still selects `settings.parameters` on
/// every request, so the minute or two of overlap a rolling deploy allows is
/// a minute or two of guaranteed 500s. Stop, migrate, start.
const settings_is_account_wide: List(String) = [
  "alter table settings drop column parameters",
  "alter table settings drop column desired_retention",
  "alter table settings drop column learning_steps",
  "alter table settings drop column relearning_steps",
  "alter table settings drop column maximum_interval",
  "alter table settings drop column enable_fuzz",
  "alter table settings drop column new_per_day",
  "alter table settings drop column reviews_per_day",
]

/// Tracks: one profile per track, sharing an account.
///
/// A track IS a category name ("NeetCode 150", "NeetCode 150 (Go)", "System
/// Design"), so cards, reviews, drafts, notes and queue items need no new
/// column -- their `category` already says which track they are in. Two
/// things do: the scheduler's settings, now per track, and the named queues,
/// whose names are only unique within one.
///
/// This migration only ever adds. `settings` keeps its per-track columns,
/// unread, for migration 9 to drop -- which ships in the same release, so see
/// the deploy note there: this pair must not go out as a rolling deploy.
const tracks: List(String) = [
  "create table track_settings (
     user_id           uuid not null references users(id) on delete cascade,
     track             text not null,
     parameters        double precision[] not null,
     desired_retention double precision not null default 0.9,
     learning_steps    int[] not null default '{1,10}',
     relearning_steps  int[] not null default '{10}',
     maximum_interval  int not null default 36500,
     enable_fuzz       boolean not null default true,
     new_per_day       int not null default 10,
     reviews_per_day   int not null default 100,
     primary key (user_id, track)
   )",
  // Every track a user already has anything in gets the settings they have
  // actually been studying under: the one row in `settings`. Someone whose
  // rows all sit in one track therefore lands on that track with every number
  // unchanged, which is the whole of "nothing may break". A track they have
  // never touched gets no row at all, and the app's own defaults answer for
  // it -- one authority for what a default is, not two.
  "insert into track_settings
     (user_id, track, parameters, desired_retention, learning_steps,
      relearning_steps, maximum_interval, enable_fuzz, new_per_day,
      reviews_per_day)
   select s.user_id, t.track, s.parameters, s.desired_retention,
          s.learning_steps, s.relearning_steps, s.maximum_interval,
          s.enable_fuzz, s.new_per_day, s.reviews_per_day
     from settings s
     join (
       select user_id, category as track from cards
       union select user_id, category from drafts
       union select user_id, category from notes
       union select q.user_id, i.category
         from queue_items i join queues q on q.id = i.queue_id
     ) t on t.user_id = s.user_id
   on conflict (user_id, track) do nothing",
  // A queue name is unique within a track, not within an account: 'Arrays' in
  // the Python track and 'Arrays' in the Go track are two lists. An existing
  // queue takes the track of its first item. One with no items has no track
  // to infer and keeps '', which no category matches, so it is inert rather
  // than wrongly attributed.
  "alter table queues add column track text not null default ''",
  "update queues q set track = coalesce((
     select i.category from queue_items i
      where i.queue_id = q.id
      order by i.position, i.category
      limit 1
   ), '')",
  "alter table queues drop constraint queues_user_id_name_key",
  "alter table queues add constraint queues_user_track_name_key
     unique (user_id, track, name)",
  // A queue spanning two tracks was two lists wearing one name. Splitting it
  // is a no-op where none exists -- both statements match nothing -- and the
  // alternative is silent loss: a track-scoped read returns the queue without
  // its foreign items, the screen shows it without them, and the first write
  // back from a track-aware client drops them with no error anywhere.
  "insert into queues (user_id, name, position, track)
   select q.user_id, q.name || ' \u{2014} ' || i.category, q.position,
          i.category
     from queues q join queue_items i on i.queue_id = q.id
    where i.category <> q.track
    group by q.user_id, q.name, q.position, i.category
   on conflict (user_id, track, name) do nothing",
  // Comma-joined, not `from ... join ... on`: Postgres will not let the
  // UPDATE's own target be referenced inside a FROM join condition, and the
  // new queue is found by the item's category. Every condition therefore
  // lives in the WHERE, where `i` is in scope.
  "update queue_items i set queue_id = n.id
     from queues o, queues n
    where i.queue_id = o.id
      and i.category <> o.track
      and n.user_id = o.user_id
      and n.track = i.category
      and n.name = o.name || ' \u{2014} ' || i.category",
  // Every per-track read narrows by (user, category): the boot payload, the
  // daily budget, the forecast, the state counts. Reviews reach a track only
  // through `cards`, and reviews_card_time_idx already serves that join, so
  // no review index is added.
  "create index cards_user_track_idx on cards (user_id, category)",
  "create index cards_track_due_idx on cards (user_id, category, due)
     where not suspended",
  "create index drafts_user_track_idx on drafts (user_id, category)",
  "create index notes_user_track_idx on notes (user_id, category)",
]

/// Named queues: a list of problems each, owned by the user and sent whole.
/// Scheduling is untouched -- a card is still the memory of one problem,
/// whichever queues list it. Dropping a queue drops its items with it.
const queues: List(String) = [
  "create table queues (
     id       uuid primary key default gen_random_uuid(),
     user_id  uuid not null references users(id) on delete cascade,
     name     text not null,
     position int not null default 0,
     unique (user_id, name)
   )",
  "create table queue_items (
     queue_id    uuid not null references queues(id) on delete cascade,
     category    text not null,
     subcategory text not null,
     title       text not null,
     position    int not null default 0,
     primary key (queue_id, category, subcategory, title)
   )",
]

/// The daily reminder: the local hour a user wants it (null is off), and a
/// log of which study days one has gone out for, so a restart -- or a
/// second instance -- can never send the same day's mail twice.
const reminders: List(String) = [
  "alter table settings add column reminder_hour int",
  "create table reminders_sent (
     user_id uuid not null references users(id) on delete cascade,
     day     date not null,
     sent_at timestamptz not null default now(),
     primary key (user_id, day)
   )",
]

/// What the card looked like before each review, so the most recent one
/// can be undone exactly: the scheduler's fuzz sample and learning step
/// are not recoverable from the log alone. `created` records that the
/// review is what put the card in the queue, so undoing it takes the card
/// back out. Null on rows from before this column existed; those cannot be
/// undone.
const review_snapshots: List(String) = [
  "alter table reviews add column card_before jsonb",
]

/// A recall-only review: approach and solution shown, graded from memory,
/// no code written. Scheduled like any other review but never a solve, so
/// the insight queries leave it out.
const recall_reviews: List(String) = [
  "alter table reviews add column recall boolean not null default false",
]

/// A note the user leaves themselves on a problem -- what they missed, what
/// to try first next time. Keyed like a draft; an empty note is deleted
/// rather than stored.
const notes: List(String) = [
  "create table notes (
     user_id     uuid not null references users(id) on delete cascade,
     category    text not null,
     subcategory text not null,
     title       text not null,
     body        text not null,
     updated_at  timestamptz not null default now(),
     primary key (user_id, category, subcategory, title)
   )",
]

/// `reps` used to be decoration; now it is the line between a card that is due
/// and a card that has never been opened. Two import paths wrote a card with
/// memory already on it and left `reps` at zero -- the legacy "solved" seed and
/// the guest upgrade -- and those cards would otherwise read as brand new,
/// getting re-introduced against the daily budget and dropping out of every
/// statistic. A card carrying stability has been answered by definition, so
/// one rep is the truthful floor.
const backfill: List(String) = [
  "update cards set reps = 1 where reps = 0 and stability is not null",
]

const init: List(String) = [
  // No extensions: `gen_random_uuid()` is built in from Postgres 13, and email
  // case-insensitivity is handled by normalising to lowercase in the
  // application rather than by `citext`. That keeps this schema installable on
  // a managed database without superuser rights.
  "create table users (
     id            uuid primary key default gen_random_uuid(),
     email         text not null unique,
     password_hash text not null,
     created_at    timestamptz not null default now()
   )",
  // Only the SHA-256 of a token is stored, never the token itself, so a dump
  // of this table yields nothing anyone can log in with.
  "create table sessions (
     token_hash bytea primary key,
     user_id    uuid not null references users(id) on delete cascade,
     created_at timestamptz not null default now(),
     expires_at timestamptz not null,
     last_seen  timestamptz not null default now()
   )",
  "create index sessions_user_id_idx on sessions (user_id)",
  // Login throttling lives in the database rather than in an ETS table so it
  // survives a restart and needs no extra supervised process. `key` is either
  // 'ip:<address>' or 'email:<address>' -- both are counted, so one attacker
  // cannot lock out a victim by guessing from many addresses, nor spray many
  // accounts from one.
  "create table login_attempts (
     key          text primary key,
     attempts     int not null default 0,
     window_start timestamptz not null default now()
   )",
  // One row per (user, problem). `category` already encodes the language
  // ('NeetCode 150 - Python' and so on), so the app's ProblemRef is the key
  // as-is, with no extra language column.
  //
  // state: 1 learning, 2 review, 3 relearning. `step` is null once graduated,
  // mirroring the scheduler's `Review` carrying no step.
  "create table cards (
     id            uuid primary key default gen_random_uuid(),
     user_id       uuid not null references users(id) on delete cascade,
     category      text not null,
     subcategory   text not null,
     title         text not null,
     state         smallint not null default 1,
     step          int,
     stability     double precision,
     difficulty    double precision,
     due           timestamptz not null default now(),
     last_review   timestamptz,
     reps          int not null default 0,
     lapses        int not null default 0,
     suspended     boolean not null default false,
     introduced_at timestamptz,
     unique (user_id, category, subcategory, title)
   )",
  "create index cards_due_idx on cards (user_id, due) where not suspended",
  // Append-only. Card state is a fold over this log, so it is never updated or
  // deleted: it is both the audit trail and the training data the FSRS
  // optimizer will later need.
  //
  // auto_failed / revealed record WHY a rating was what it was -- the harness
  // failed, or the solution was shown. Both force Again, and both are worth
  // being able to separate later from a self-graded Again.
  "create table reviews (
     id               bigserial primary key,
     user_id          uuid not null references users(id) on delete cascade,
     card_id          uuid not null references cards(id) on delete cascade,
     rating           smallint not null check (rating between 1 and 4),
     state_before     smallint not null,
     reviewed_at      timestamptz not null,
     elapsed_days     int not null,
     scheduled_days   int not null,
     stability_after  double precision,
     difficulty_after double precision,
     duration_ms      int,
     auto_failed      boolean not null default false,
     revealed         boolean not null default false
   )",
  "create index reviews_user_time_idx on reviews (user_id, reviewed_at)",
  "create index reviews_card_time_idx on reviews (card_id, reviewed_at)",
  "create table drafts (
     user_id     uuid not null references users(id) on delete cascade,
     category    text not null,
     subcategory text not null,
     title       text not null,
     body        text not null,
     updated_at  timestamptz not null default now(),
     primary key (user_id, category, subcategory, title)
   )",
  // day_start_hour is Anki's rollover: the study day starts at 04:00 local, so
  // a late-night session counts toward the day it feels like rather than the
  // one the clock says.
  "create table settings (
     user_id           uuid primary key references users(id) on delete cascade,
     parameters        double precision[] not null,
     desired_retention double precision not null default 0.9,
     learning_steps    int[] not null default '{1,10}',
     relearning_steps  int[] not null default '{10}',
     maximum_interval  int not null default 36500,
     enable_fuzz       boolean not null default true,
     new_per_day       int not null default 10,
     reviews_per_day   int not null default 100,
     day_start_hour    int not null default 4,
     timezone          text not null default 'UTC'
   )",
]
