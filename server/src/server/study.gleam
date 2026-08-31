//// Cards, reviews, drafts and scheduler settings -- the study data layer.
////
//// The server is the sole authority on scheduling: it decides what `now` is
//// and it runs FSRS. The client never computes a due date it can persist, it
//// only previews one. That is what stops a clock skew or a tampered request
//// from corrupting a review history.

import fsrs
import gleam/dynamic/decode
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import pog
import wire

/// The app's problem key. `category` already encodes the language
/// ("NeetCode 150 - Python"), so this needs no language field.
///
/// This and the payload types below are aliases into `wire`, the package the
/// browser app compiles against too. They used to be declared here and again
/// there, by hand, with only captured fixtures to notice when the two parted
/// company -- which they had: `rating` crossed as an `Int` from this side and
/// was modelled as an `fsrs.Rating` on the other.
pub type ProblemRef =
  wire.ProblemRef

pub type CardRecord {
  CardRecord(
    id: String,
    problem: ProblemRef,
    card: fsrs.Card,
    reps: Int,
    lapses: Int,
    suspended: Bool,
    /// When the card was first seen. The client counts new cards against the
    /// daily budget with this, so it must cross the wire.
    introduced_at: Option(Timestamp),
  )
}

pub type Settings =
  wire.Settings

/// A review as the client submits it. Field-for-field the wire shape, so it
/// is that shape: `practice` means the rating stands as sent, and only the
/// scheduled study queue is held to the coercion below. The log records
/// auto_failed/revealed truthfully either way.
pub type ReviewInput =
  wire.Review

pub type StudyError {
  StudyDatabaseError(String)
}

// --- settings --------------------------------------------------------------

pub fn default_settings() -> Settings {
  wire.default_settings()
}

pub fn load_settings(
  db: pog.Connection,
  user_id: String,
) -> Result(Settings, StudyError) {
  pog.query(
    "select parameters, desired_retention, learning_steps, relearning_steps,
            maximum_interval, enable_fuzz, new_per_day, reviews_per_day,
            day_start_hour, timezone
       from settings
      where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning(settings_decoder())
  |> pog.execute(db)
  |> result.map_error(database_error)
  // A user with no settings row should be impossible -- signup creates one in
  // the same transaction as the account -- but defaulting beats failing every
  // review if it ever happens.
  |> result.map(fn(returned) {
    list.first(returned.rows) |> result.unwrap(default_settings())
  })
}

pub fn save_settings(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(Nil, StudyError) {
  pog.query(
    "update settings set
       parameters = $2, desired_retention = $3,
       learning_steps = $4, relearning_steps = $5,
       maximum_interval = $6, enable_fuzz = $7,
       new_per_day = $8, reviews_per_day = $9,
       day_start_hour = $10, timezone = $11
     where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.array(pog.float, settings.scheduler.parameters))
  |> pog.parameter(pog.float(settings.scheduler.desired_retention))
  |> pog.parameter(pog.array(pog.int, settings.scheduler.learning_steps))
  |> pog.parameter(pog.array(pog.int, settings.scheduler.relearning_steps))
  |> pog.parameter(pog.int(settings.scheduler.maximum_interval))
  |> pog.parameter(pog.bool(settings.scheduler.enable_fuzz))
  |> pog.parameter(pog.int(settings.new_per_day))
  |> pog.parameter(pog.int(settings.reviews_per_day))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn settings_decoder() -> decode.Decoder(Settings) {
  use parameters <- decode.field(0, decode.list(decode.float))
  use desired_retention <- decode.field(1, decode.float)
  use learning_steps <- decode.field(2, decode.list(decode.int))
  use relearning_steps <- decode.field(3, decode.list(decode.int))
  use maximum_interval <- decode.field(4, decode.int)
  use enable_fuzz <- decode.field(5, decode.bool)
  use new_per_day <- decode.field(6, decode.int)
  use reviews_per_day <- decode.field(7, decode.int)
  use day_start_hour <- decode.field(8, decode.int)
  use timezone <- decode.field(9, decode.string)
  decode.success(wire.Settings(
    scheduler: fsrs.Config(
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
    ),
    new_per_day:,
    reviews_per_day:,
    day_start_hour:,
    timezone:,
  ))
}

// --- cards -----------------------------------------------------------------

const card_columns = "id::text, category, subcategory, title, state, step,
   stability, difficulty,
   extract(epoch from due)::float8,
   extract(epoch from last_review)::float8,
   reps, lapses, suspended,
   extract(epoch from introduced_at)::float8"

pub fn load_cards(
  db: pog.Connection,
  user_id: String,
) -> Result(List(CardRecord), StudyError) {
  pog.query("select " <> card_columns <> " from cards where user_id = $1::uuid")
  |> pog.parameter(pog.text(user_id))
  |> pog.returning(card_decoder())
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

/// Parks or resumes one card. Only a card that exists — i.e. has been
/// reviewed at least once — can be suspended: an unseen problem is managed by
/// simply not studying it, so a missing row is the caller's 404, not an
/// upsert.
pub fn set_suspended(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  suspended: Bool,
) -> Result(Option(CardRecord), StudyError) {
  pog.query("update cards set suspended = $5
     where user_id = $1::uuid
       and category = $2 and subcategory = $3 and title = $4
     returning " <> card_columns)
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.parameter(pog.bool(suspended))
  |> pog.returning(card_decoder())
  |> pog.execute(db)
  |> result.map(fn(returned) {
    case returned.rows {
      [card, ..] -> Some(card)
      [] -> None
    }
  })
  |> result.map_error(database_error)
}

/// Cards are created lazily, on first review, rather than seeding ~1200 rows
/// per user up front for problems they may never open.
///
/// The `do update` is a deliberate no-op: `on conflict do nothing` would skip
/// RETURNING for an existing row, and this needs the row either way.
fn upsert_card(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
) -> Result(CardRecord, StudyError) {
  pog.query(
    "insert into cards (user_id, category, subcategory, title, introduced_at)
     values ($1::uuid, $2, $3, $4, now())
     on conflict (user_id, category, subcategory, title)
       do update set suspended = cards.suspended
     returning " <> card_columns,
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.returning(card_decoder())
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.try(fn(returned) {
    list.first(returned.rows)
    |> result.replace_error(StudyDatabaseError("card upsert returned no row"))
  })
}

fn update_card(
  db: pog.Connection,
  record: CardRecord,
) -> Result(Nil, StudyError) {
  pog.query(
    "update cards set
       state = $2, step = $3, stability = $4, difficulty = $5,
       due = to_timestamp($6::float8),
       last_review = to_timestamp($7::float8),
       reps = $8, lapses = $9
     where id = $1::uuid",
  )
  |> pog.parameter(pog.text(record.id))
  |> pog.parameter(pog.int(state_code(record.card.state)))
  |> pog.parameter(pog.nullable(pog.int, state_step(record.card.state)))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.stability }),
  ))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.difficulty }),
  ))
  |> pog.parameter(pog.float(fsrs.to_epoch(record.card.due)))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.last_review, fsrs.to_epoch),
  ))
  |> pog.parameter(pog.int(record.reps))
  |> pog.parameter(pog.int(record.lapses))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn card_decoder() -> decode.Decoder(CardRecord) {
  use id <- decode.field(0, decode.string)
  use category <- decode.field(1, decode.string)
  use subcategory <- decode.field(2, decode.string)
  use title <- decode.field(3, decode.string)
  use state <- decode.field(4, decode.int)
  use step <- decode.field(5, decode.optional(decode.int))
  use stability <- decode.field(6, decode.optional(decode.float))
  use difficulty <- decode.field(7, decode.optional(decode.float))
  use due <- decode.field(8, decode.float)
  use last_review <- decode.field(9, decode.optional(decode.float))
  use reps <- decode.field(10, decode.int)
  use lapses <- decode.field(11, decode.int)
  use suspended <- decode.field(12, decode.bool)
  use introduced_at <- decode.field(13, decode.optional(decode.float))

  decode.success(CardRecord(
    id:,
    problem: wire.ProblemRef(category:, subcategory:, title:),
    card: fsrs.Card(
      state: state_from(state, step),
      memory: memory_from(stability, difficulty),
      due: fsrs.from_epoch(due),
      last_review: option.map(last_review, fsrs.from_epoch),
    ),
    reps:,
    lapses:,
    suspended:,
    introduced_at: option.map(introduced_at, fsrs.from_epoch),
  ))
}

pub const state_code = wire.state_code

pub const state_step = wire.state_step

const state_from = wire.state_from

/// Stability and difficulty are always written together, so either both are
/// present or the card has never been reviewed.
fn memory_from(
  stability: Option(Float),
  difficulty: Option(Float),
) -> Option(fsrs.Memory) {
  case stability, difficulty {
    Some(stability), Some(difficulty) ->
      Some(fsrs.Memory(stability:, difficulty:))
    _, _ -> None
  }
}

// --- recording a review ----------------------------------------------------

/// Schedules a review and records it, atomically.
///
/// The rating is coerced, not trusted: a failed harness or a revealed solution
/// forces `Again` regardless of what the client sent. The client enforces this
/// in its UI too, but the invariant belongs here -- a review history is only
/// worth optimising against if it cannot be flattered.
pub fn record_review(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
  input: ReviewInput,
  now: Timestamp,
  fuzz: Float,
) -> Result(CardRecord, StudyError) {
  pog.transaction(db, fn(tx) {
    use existing <- result.try(upsert_card(tx, user_id, input.problem))
    let before = existing.card

    // The honesty rule applies from the second review onward: the first
    // encounter is the learning step, where revealing the solution is how you
    // learn, so the self-grade stands. Later, a failed harness or a revealed
    // solution forces Again whatever the client sent — a review history is
    // only worth optimising against if it cannot be flattered. The log's
    // `revealed`/`auto_failed` columns record the truth in every case.
    let first = before.memory == None
    let rating = case
      !first && !input.practice && { input.auto_failed || input.revealed }
    {
      True -> fsrs.Again
      False -> input.rating
    }

    let elapsed = case before.last_review {
      Some(last) -> fsrs.days_between(last, now)
      // A card's first ever review has no elapsed time to report.
      None -> 0
    }
    let scheduled = case before.last_review {
      Some(last) -> fsrs.days_between(last, before.due)
      None -> 0
    }

    let after = fsrs.review(before, rating, now, settings.scheduler, fuzz)

    // Anki counts a lapse only when a card that had graduated fails, not when
    // one still in learning does.
    let lapses = case rating, before.state {
      fsrs.Again, fsrs.Review -> existing.lapses + 1
      _, _ -> existing.lapses
    }

    let record =
      CardRecord(..existing, card: after, reps: existing.reps + 1, lapses:)

    use _ <- result.try(update_card(tx, record))
    use _ <- result.try(insert_review(
      tx,
      user_id,
      record,
      rating,
      before,
      now,
      elapsed,
      scheduled,
      input,
    ))
    Ok(record)
  })
  |> result.map_error(flatten_transaction_error)
}

fn insert_review(
  db: pog.Connection,
  user_id: String,
  record: CardRecord,
  rating: fsrs.Rating,
  before: fsrs.Card,
  now: Timestamp,
  elapsed_days: Int,
  scheduled_days: Int,
  input: ReviewInput,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into reviews (
       user_id, card_id, rating, state_before, reviewed_at,
       elapsed_days, scheduled_days, stability_after, difficulty_after,
       duration_ms, auto_failed, revealed)
     values ($1::uuid, $2::uuid, $3, $4, to_timestamp($5::float8),
             $6, $7, $8, $9, $10, $11, $12)",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(record.id))
  |> pog.parameter(pog.int(fsrs.rating_to_int(rating)))
  |> pog.parameter(pog.int(state_code(before.state)))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.parameter(pog.int(elapsed_days))
  |> pog.parameter(pog.int(scheduled_days))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.stability }),
  ))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(record.card.memory, fn(m) { m.difficulty }),
  ))
  |> pog.parameter(pog.nullable(pog.int, input.duration_ms))
  |> pog.parameter(pog.bool(input.auto_failed))
  |> pog.parameter(pog.bool(input.revealed))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- drafts ----------------------------------------------------------------

pub fn load_drafts(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(ProblemRef, String)), StudyError) {
  pog.query(
    "select category, subcategory, title, body
       from drafts where user_id = $1::uuid",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use body <- decode.field(3, decode.string)
    decode.success(#(wire.ProblemRef(category:, subcategory:, title:), body))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

pub fn save_draft(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  body: String,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into drafts (user_id, category, subcategory, title, body)
     values ($1::uuid, $2, $3, $4, $5)
     on conflict (user_id, category, subcategory, title)
       do update set body = excluded.body, updated_at = now()",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.parameter(pog.text(body))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- errors ----------------------------------------------------------------

fn database_error(error: pog.QueryError) -> StudyError {
  StudyDatabaseError(string.inspect(error))
}

fn flatten_transaction_error(
  error: pog.TransactionError(StudyError),
) -> StudyError {
  case error {
    pog.TransactionRolledBack(reason) -> reason
    pog.TransactionQueryError(query_error) -> database_error(query_error)
  }
}

// --- the study day ---------------------------------------------------------

/// Where the user stands against today's limits.
///
/// `new_remaining` is a budget, not a list: the server cannot enumerate new
/// problems because the catalogue lives in the client bundle, not the
/// database (cards are created on first review). So the server owns the
/// scheduling of known cards and the daily allowance, and the client picks
/// which unseen problems to spend that allowance on.
pub type Today =
  wire.Today

/// The study day runs from `day_start_hour` local time to the same hour the
/// next day -- Anki's 4am rollover, so a late-night session counts toward the
/// day it feels like rather than the one the clock says.
///
/// The timezone arithmetic is done by Postgres on purpose: it ships a full
/// IANA database and handles DST, neither of which Gleam has on the Erlang
/// target.
pub fn today(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
  now: Timestamp,
) -> Result(Today, StudyError) {
  pog.query(
    "with bounds as (
       select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                                - make_interval(hours => $3))
              + make_interval(hours => $3) as local_start
     )
     select
       extract(epoch from (local_start at time zone $2))::float8,
       extract(epoch from ((local_start + interval '1 day') at time zone $2))::float8,
       (select count(*) from reviews r
         where r.user_id = $1::uuid
           and r.reviewed_at >= (local_start at time zone $2))::int,
       (select count(*) from cards c
         where c.user_id = $1::uuid
           and c.introduced_at >= (local_start at time zone $2))::int,
       (select count(*) from cards c
         where c.user_id = $1::uuid
           and not c.suspended
           and c.due <= to_timestamp($4::float8))::int
     from bounds",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.returning({
    use day_start <- decode.field(0, decode.float)
    use day_end <- decode.field(1, decode.float)
    use reviews_done <- decode.field(2, decode.int)
    use new_introduced <- decode.field(3, decode.int)
    use due_now <- decode.field(4, decode.int)
    decode.success(#(day_start, day_end, reviews_done, new_introduced, due_now))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.try(fn(returned) {
    case list.first(returned.rows) {
      Error(Nil) ->
        Error(StudyDatabaseError("day bounds query returned no row"))
      Ok(#(day_start, day_end, reviews_done, new_introduced, due_now)) ->
        Ok(wire.Today(
          day_start: fsrs.from_epoch(day_start),
          day_end: fsrs.from_epoch(day_end),
          reviews_done:,
          new_introduced:,
          reviews_remaining: int_max(settings.reviews_per_day - reviews_done, 0),
          new_remaining: int_max(settings.new_per_day - new_introduced, 0),
          due_now:,
        ))
    }
  })
}

/// Postgres rejects an unknown zone name at query time, which would then break
/// every subsequent `today` call. Checking on write keeps a bad value out.
pub fn timezone_is_valid(
  db: pog.Connection,
  timezone: String,
) -> Result(Bool, StudyError) {
  pog.query("select 1 from pg_timezone_names where name = $1")
  |> pog.parameter(pog.text(timezone))
  |> pog.returning({
    use value <- decode.field(0, decode.int)
    decode.success(value)
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows != [] })
  |> result.map_error(database_error)
}

fn int_max(value: Int, floor: Int) -> Int {
  case value > floor {
    True -> value
    False -> floor
  }
}

// --- statistics ------------------------------------------------------------

/// Days are reported as "days ago" integers rather than dates.
///
/// The rollover and timezone maths has already been applied when producing
/// them, so the client can render a heatmap and count a streak with plain
/// integer arithmetic instead of reimplementing a calendar.
pub type DayTally =
  wire.DayTally

pub type Stats =
  wire.Stats

pub fn stats(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(Stats, StudyError) {
  use totals <- result.try(review_totals(db, user_id))
  use state_counts <- result.try(state_counts(db, user_id))
  use history <- result.try(review_history(db, user_id, settings))
  use forecast <- result.try(due_forecast(db, user_id, settings))

  let #(total_reviews, mature_reviews, mature_correct) = totals
  Ok(wire.Stats(
    total_reviews:,
    mature_reviews:,
    mature_correct:,
    state_counts:,
    history:,
    forecast:,
    streak_days: streak(history),
  ))
}

/// Consecutive study days ending today, or ending yesterday if today has no
/// reviews yet -- a streak should not appear broken just because you have not
/// sat down yet.
///
/// Public only so `server_test` can reach it: the off-by-one between "today"
/// and "yesterday" is the kind of thing that breaks twice a year and never in
/// a way anyone notices.
pub fn streak(history: List(DayTally)) -> Int {
  let days =
    history |> list.map(fn(day) { day.days_ago }) |> list.sort(int.compare)
  case days {
    [0, ..] -> count_run(days, 0)
    [1, ..] -> count_run(days, 1)
    _ -> 0
  }
}

fn count_run(days: List(Int), expected: Int) -> Int {
  case days {
    [first, ..rest] if first == expected -> 1 + count_run(rest, expected + 1)
    _ -> 0
  }
}

fn review_totals(
  db: pog.Connection,
  user_id: String,
) -> Result(#(Int, Int, Int), StudyError) {
  pog.query(
    "select
       (select count(*) from reviews where user_id = $1::uuid)::int,
       (select count(*) from reviews
         where user_id = $1::uuid and state_before = 2)::int,
       (select count(*) from reviews
         where user_id = $1::uuid and state_before = 2 and rating > 1)::int",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use total <- decode.field(0, decode.int)
    use mature <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(#(total, mature, correct))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.map(fn(returned) {
    list.first(returned.rows) |> result.unwrap(#(0, 0, 0))
  })
}

fn state_counts(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(Int, Int)), StudyError) {
  pog.query(
    "select state, count(*)::int from cards
      where user_id = $1::uuid group by state order by state",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use state <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(#(state, count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn review_history(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(List(DayTally), StudyError) {
  pog.query(
    "with study_day as (
       select date_trunc('day', (now() at time zone $2) - make_interval(hours => $3))::date as today
     )
     select (select today from study_day)
            - date_trunc('day', (reviewed_at at time zone $2)
                                - make_interval(hours => $3))::date,
            count(*)::int,
            count(*) filter (where rating > 1)::int
       from reviews
      where user_id = $1::uuid
        and reviewed_at >= now() - interval '365 days'
      group by 1
      order by 1",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.returning({
    use days_ago <- decode.field(0, decode.int)
    use total <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(wire.DayTally(days_ago:, total:, correct:))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn due_forecast(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
) -> Result(List(#(Int, Int)), StudyError) {
  pog.query(
    "with study_day as (
       select date_trunc('day', (now() at time zone $2) - make_interval(hours => $3))::date as today
     )
     select greatest(
              0,
              date_trunc('day', (due at time zone $2)
                                - make_interval(hours => $3))::date
              - (select today from study_day)
            ),
            count(*)::int
       from cards
      where user_id = $1::uuid
        and not suspended
        and due < now() + interval '30 days'
      group by 1
      order by 1",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(settings.timezone))
  |> pog.parameter(pog.int(settings.day_start_hour))
  |> pog.returning({
    use offset <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(#(offset, count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

// --- one-time import -------------------------------------------------------

/// A card carried over from guest mode, with the scheduling it actually
/// earned. Distinct from the legacy `solved` list, which has no dates at all.
pub type ImportCard {
  ImportCard(
    problem: ProblemRef,
    state: Int,
    step: Option(Int),
    memory: Option(fsrs.Memory),
    due: Timestamp,
    last_review: Option(Timestamp),
    reps: Int,
    lapses: Int,
    /// When the guest first saw this card. Carried across rather than reset,
    /// or every imported card would count against the day's new-card budget
    /// and the user could study nothing on the day they signed up.
    introduced_at: Option(Timestamp),
  )
}

/// Seeds cards and drafts from the pre-account localStorage state.
///
/// Solved problems become Review cards due now, seeded with the memory state a
/// `Good` first answer would produce. They are deliberately NOT written to the
/// review log: the old format stored a sticky boolean and no dates at all, so
/// any review history invented from it would be fiction — and fiction is
/// exactly what the FSRS optimizer must never be trained on.
///
/// Existing cards are left alone, so running this twice cannot overwrite real
/// scheduling with a seed.
pub fn import_legacy(
  db: pog.Connection,
  user_id: String,
  settings: Settings,
  solved: List(ProblemRef),
  cards: List(ImportCard),
  drafts: List(#(ProblemRef, String)),
  now: Timestamp,
) -> Result(Nil, StudyError) {
  let seed = fsrs.initial_memory(settings.scheduler, fsrs.Good)

  pog.transaction(db, fn(tx) {
    // Real guest scheduling first, so a problem present in both lists keeps
    // the state it earned rather than the flat legacy seed.
    use _ <- result.try(
      list.try_each(cards, fn(card) { insert_card(tx, user_id, card, now) }),
    )
    use _ <- result.try(
      list.try_each(solved, fn(problem) {
        seed_card(tx, user_id, problem, seed, now)
      }),
    )
    list.try_each(drafts, fn(entry) {
      save_draft(tx, user_id, entry.0, entry.1)
    })
  })
  |> result.map_error(flatten_transaction_error)
}

/// Writes a guest's card with the scheduling it actually earned.
///
/// Like `seed_card` this never overwrites an existing row, so merging guest
/// progress into an established account cannot clobber real scheduling, and
/// retrying an import is harmless.
///
/// Deliberately writes no `reviews` rows. Those reviews genuinely happened,
/// but the log is the FSRS optimizer's training set and it should mean
/// "reviews this account recorded"; carrying them across needs an `imported`
/// flag first. Card state is what determines all future scheduling, and that
/// is preserved exactly.
fn insert_card(
  db: pog.Connection,
  user_id: String,
  card: ImportCard,
  now: Timestamp,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into cards (
       user_id, category, subcategory, title,
       state, step, stability, difficulty, due, last_review,
       reps, lapses, introduced_at)
     values ($1::uuid, $2, $3, $4, $5, $6, $7, $8,
             to_timestamp($9::float8),
             case when $10::float8 is null then null
                  else to_timestamp($10::float8) end,
             $11, $12, to_timestamp($13::float8))
     on conflict (user_id, category, subcategory, title) do nothing",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(card.problem.category))
  |> pog.parameter(pog.text(card.problem.subcategory))
  |> pog.parameter(pog.text(card.problem.title))
  |> pog.parameter(pog.int(card.state))
  |> pog.parameter(pog.nullable(pog.int, card.step))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(card.memory, fn(m) { m.stability }),
  ))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(card.memory, fn(m) { m.difficulty }),
  ))
  |> pog.parameter(pog.float(fsrs.to_epoch(card.due)))
  |> pog.parameter(pog.nullable(
    pog.float,
    option.map(card.last_review, fsrs.to_epoch),
  ))
  |> pog.parameter(pog.int(card.reps))
  |> pog.parameter(pog.int(card.lapses))
  |> pog.parameter(
    pog.float(fsrs.to_epoch(option.unwrap(card.introduced_at, now))),
  )
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

fn seed_card(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
  seed: fsrs.Memory,
  now: Timestamp,
) -> Result(Nil, StudyError) {
  pog.query(
    "insert into cards (
       user_id, category, subcategory, title,
       state, step, stability, difficulty, due, introduced_at)
     values ($1::uuid, $2, $3, $4, 2, null, $5, $6,
             to_timestamp($7::float8), to_timestamp($7::float8))
     on conflict (user_id, category, subcategory, title) do nothing",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.parameter(pog.float(seed.stability))
  |> pog.parameter(pog.float(seed.difficulty))
  |> pog.parameter(pog.float(fsrs.to_epoch(now)))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- insights --------------------------------------------------------------

/// One solution-from-memory: a review that passed with no reveal and no
/// harness failure, with how long it took. The client folds these into
/// fluency tiers; the cap of five per card bounds the payload.
pub type CleanSolve =
  wire.CleanSolve

/// For each grade pressed, what happened at that card's NEXT review. Easy
/// scoring below Good is the signature of optimistic Easy-pressing, which is
/// exactly what this exists to surface.
pub type Calibration =
  wire.Calibration

pub type Insights =
  wire.Insights

/// One row of a card's review log, for the per-problem timeline.
pub type ReviewRow =
  wire.ReviewRow

pub fn insights(
  db: pog.Connection,
  user_id: String,
) -> Result(Insights, StudyError) {
  use clean_solves <- result.try(clean_solves(db, user_id))
  use reveals <- result.try(reveal_counts(db, user_id))
  use calibration <- result.try(calibration(db, user_id))
  Ok(wire.Insights(clean_solves:, reveals:, calibration:))
}

/// The last five clean solves per card, oldest first. Five is enough for a
/// median-of-three fluency figure plus a visible trend.
fn clean_solves(
  db: pog.Connection,
  user_id: String,
) -> Result(List(CleanSolve), StudyError) {
  pog.query(
    "select category, subcategory, title, at, duration_ms from (
       select c.category, c.subcategory, c.title,
              extract(epoch from r.reviewed_at)::float8 as at,
              r.duration_ms,
              row_number() over (
                partition by r.card_id order by r.reviewed_at desc
              ) as recency
         from reviews r
         join cards c on c.id = r.card_id
        where r.user_id = $1::uuid
          and r.rating > 1
          and not r.revealed
          and not r.auto_failed
          and r.duration_ms is not null
     ) latest
     where recency <= 5
     order by category, subcategory, title, at",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use at <- decode.field(3, decode.float)
    use duration_ms <- decode.field(4, decode.int)
    decode.success(wire.CleanSolve(
      problem: wire.ProblemRef(category:, subcategory:, title:),
      at: fsrs.from_epoch(at),
      duration_ms:,
    ))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn reveal_counts(
  db: pog.Connection,
  user_id: String,
) -> Result(List(#(wire.ProblemRef, Int)), StudyError) {
  pog.query(
    "select c.category, c.subcategory, c.title, count(*)::int
       from reviews r
       join cards c on c.id = r.card_id
      where r.user_id = $1::uuid and r.revealed
      group by 1, 2, 3",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use count <- decode.field(3, decode.int)
    decode.success(#(wire.ProblemRef(category:, subcategory:, title:), count))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

fn calibration(
  db: pog.Connection,
  user_id: String,
) -> Result(List(wire.Calibration), StudyError) {
  pog.query(
    "select rating, count(*)::int,
            count(*) filter (where next_pass)::int
       from (
         select r.rating,
                lead(r.rating > 1 and not r.revealed and not r.auto_failed)
                  over (partition by r.card_id order by r.reviewed_at)
                  as next_pass
           from reviews r
          where r.user_id = $1::uuid
       ) sequenced
      where next_pass is not null
      group by rating
      order by rating",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.returning({
    use rating <- decode.field(0, decode.int)
    use total <- decode.field(1, decode.int)
    use passed <- decode.field(2, decode.int)
    // `group by rating` can only yield what the insert accepted, so an
    // unrecognised code is impossible rather than merely unlikely -- but the
    // wire type is an fsrs.Rating, so it still has to be named.
    let rating = result.unwrap(fsrs.rating_from_int(rating), fsrs.Good)
    decode.success(wire.Calibration(rating:, total:, passed:))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}

pub fn history(
  db: pog.Connection,
  user_id: String,
  problem: ProblemRef,
) -> Result(List(ReviewRow), StudyError) {
  pog.query(
    "select extract(epoch from r.reviewed_at)::float8, r.rating,
            r.duration_ms, r.revealed, r.auto_failed, r.state_before,
            r.scheduled_days, r.stability_after
       from reviews r
       join cards c on c.id = r.card_id
      where r.user_id = $1::uuid
        and c.category = $2 and c.subcategory = $3 and c.title = $4
      order by r.reviewed_at",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.text(problem.category))
  |> pog.parameter(pog.text(problem.subcategory))
  |> pog.parameter(pog.text(problem.title))
  |> pog.returning({
    use at <- decode.field(0, decode.float)
    use rating <- decode.field(1, decode.int)
    use duration_ms <- decode.field(2, decode.optional(decode.int))
    use revealed <- decode.field(3, decode.bool)
    use auto_failed <- decode.field(4, decode.bool)
    use state_before <- decode.field(5, decode.int)
    use scheduled_days <- decode.field(6, decode.int)
    use stability_after <- decode.field(7, decode.optional(decode.float))
    // The column is constrained to 1-4 by the insert; `Good` is unreachable
    // rather than a guess.
    let rating = result.unwrap(fsrs.rating_from_int(rating), fsrs.Good)
    decode.success(wire.ReviewRow(
      at: fsrs.from_epoch(at),
      rating:,
      duration_ms:,
      revealed:,
      auto_failed:,
      state_before:,
      scheduled_days:,
      stability_after:,
    ))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(database_error)
}
