//// This module contains the code to run the sql queries defined in
//// `./src/server/study/insights/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import gleam/option.{type Option}
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `calibration` query
/// defined in `./src/server/study/insights/sql/calibration.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type CalibrationRow {
  CalibrationRow(rating: Int, total: Int, passed: Int)
}

/// For each grade pressed in one track, how many reviews had one after them
/// and how many of those next reviews were clean passes.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn calibration(
  db: pog.Connection,
  r_user_id: Uuid,
  c_ategory: String,
) -> Result(pog.Returned(CalibrationRow), pog.QueryError) {
  let decoder = {
    use rating <- decode.field(0, decode.int)
    use total <- decode.field(1, decode.int)
    use passed <- decode.field(2, decode.int)
    decode.success(CalibrationRow(rating:, total:, passed:))
  }

  "-- For each grade pressed in one track, how many reviews had one after them
-- and how many of those next reviews were clean passes.
select rating, count(*)::int as total,
       count(*) filter (where next_pass)::int as passed
  from (
    select r.rating,
           lead(r.rating > 1 and not r.revealed and not r.auto_failed
                and not r.recall)
             over (partition by r.card_id order by r.reviewed_at)
             as next_pass
      from reviews r
      join cards c on c.id = r.card_id
     where r.user_id = $1 and c.category = $2
  ) sequenced
 where next_pass is not null
 group by rating
 order by rating
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(c_ategory))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `clean_solves` query
/// defined in `./src/server/study/insights/sql/clean_solves.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type CleanSolvesRow {
  CleanSolvesRow(
    category: String,
    subcategory: String,
    title: String,
    at: Float,
    duration_ms: Int,
  )
}

/// The last five clean solves per card in one track, oldest first: passed,
/// not revealed, not auto-failed, not a recall review, and timed. The
/// duration is never null here, which the "!" tells Squirrel.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn clean_solves(
  db: pog.Connection,
  r_user_id: Uuid,
  c_ategory: String,
) -> Result(pog.Returned(CleanSolvesRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use at <- decode.field(3, decode.float)
    use duration_ms <- decode.field(4, decode.int)
    decode.success(CleanSolvesRow(
      category:,
      subcategory:,
      title:,
      at:,
      duration_ms:,
    ))
  }

  "-- The last five clean solves per card in one track, oldest first: passed,
-- not revealed, not auto-failed, not a recall review, and timed. The
-- duration is never null here, which the \"!\" tells Squirrel.
select category, subcategory, title, at, duration_ms as \"duration_ms!\"
  from (
    select c.category, c.subcategory, c.title,
           extract(epoch from r.reviewed_at)::float8 as at,
           r.duration_ms,
           row_number() over (
             partition by r.card_id order by r.reviewed_at desc
           ) as recency
      from reviews r
      join cards c on c.id = r.card_id
     where r.user_id = $1 and c.category = $2
       and r.rating > 1
       and not r.revealed
       and not r.auto_failed
       and not r.recall
       and r.duration_ms is not null
  ) latest
 where recency <= 5
 order by category, subcategory, title, at
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(c_ategory))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `problem_history` query
/// defined in `./src/server/study/insights/sql/problem_history.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type ProblemHistoryRow {
  ProblemHistoryRow(
    at: Float,
    rating: Int,
    duration_ms: Option(Int),
    revealed: Bool,
    auto_failed: Bool,
    state_before: Int,
    scheduled_days: Int,
    stability_after: Option(Float),
    recall: Bool,
  )
}

/// One problem's review log, oldest first, for the per-problem timeline.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn problem_history(
  db: pog.Connection,
  r_user_id: Uuid,
  c_ategory: String,
  c_subcategory: String,
  c_title: String,
) -> Result(pog.Returned(ProblemHistoryRow), pog.QueryError) {
  let decoder = {
    use at <- decode.field(0, decode.float)
    use rating <- decode.field(1, decode.int)
    use duration_ms <- decode.field(2, decode.optional(decode.int))
    use revealed <- decode.field(3, decode.bool)
    use auto_failed <- decode.field(4, decode.bool)
    use state_before <- decode.field(5, decode.int)
    use scheduled_days <- decode.field(6, decode.int)
    use stability_after <- decode.field(7, decode.optional(decode.float))
    use recall <- decode.field(8, decode.bool)
    decode.success(ProblemHistoryRow(
      at:,
      rating:,
      duration_ms:,
      revealed:,
      auto_failed:,
      state_before:,
      scheduled_days:,
      stability_after:,
      recall:,
    ))
  }

  "-- One problem's review log, oldest first, for the per-problem timeline.
select extract(epoch from r.reviewed_at)::float8 as at, r.rating,
       r.duration_ms, r.revealed, r.auto_failed, r.state_before,
       r.scheduled_days, r.stability_after, r.recall
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1
   and c.category = $2 and c.subcategory = $3 and c.title = $4
 order by r.reviewed_at
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(c_ategory))
  |> pog.parameter(pog.text(c_subcategory))
  |> pog.parameter(pog.text(c_title))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `reveal_counts` query
/// defined in `./src/server/study/insights/sql/reveal_counts.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type RevealCountsRow {
  RevealCountsRow(
    category: String,
    subcategory: String,
    title: String,
    reveals: Int,
  )
}

/// How many times each problem in one track had its solution revealed.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn reveal_counts(
  db: pog.Connection,
  r_user_id: Uuid,
  c_ategory: String,
) -> Result(pog.Returned(RevealCountsRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    use subcategory <- decode.field(1, decode.string)
    use title <- decode.field(2, decode.string)
    use reveals <- decode.field(3, decode.int)
    decode.success(RevealCountsRow(category:, subcategory:, title:, reveals:))
  }

  "-- How many times each problem in one track had its solution revealed.
select c.category, c.subcategory, c.title, count(*)::int as reveals
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1 and c.category = $2 and r.revealed
 group by 1, 2, 3
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(c_ategory))
  |> pog.returning(decoder)
  |> pog.execute(db)
}
