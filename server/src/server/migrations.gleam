//// Schema migrations, embedded as Gleam rather than read from `.sql` files.
////
//// A compiled OTP release ships no source tree, so reading migrations off
//// disk at boot would mean shipping and locating a `priv` directory.
//// Embedding removes that failure mode, and matches how the rest of this repo
//// handles content (see `src/algodrill/problems/embedded.gleam`).
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
  [Migration(1, "init", init)]
}

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
