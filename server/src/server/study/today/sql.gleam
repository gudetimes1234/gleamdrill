//// This module contains the code to run the sql queries defined in
//// `./src/server/study/today/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import gleam/option.{type Option}
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `day_counts` query
/// defined in `./src/server/study/today/sql/day_counts.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type DayCountsRow {
  DayCountsRow(
    day_start: Float,
    day_end: Float,
    reviews_done: Int,
    new_introduced: Int,
    due_now: Int,
  )
}

/// The current study day's bounds, as epoch seconds, and one track's counts
/// within it: reviews done, cards introduced, and cards due now. $2 is the
/// timezone, $3 the day_start_hour the day rolls over at, $4 now.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn day_counts(
  db: pog.Connection,
  r_user_id: Uuid,
  arg_2: String,
  arg_3: Int,
  arg_4: Float,
  rc_category: String,
) -> Result(pog.Returned(DayCountsRow), pog.QueryError) {
  let decoder = {
    use day_start <- decode.field(0, decode.float)
    use day_end <- decode.field(1, decode.float)
    use reviews_done <- decode.field(2, decode.int)
    use new_introduced <- decode.field(3, decode.int)
    use due_now <- decode.field(4, decode.int)
    decode.success(DayCountsRow(
      day_start:,
      day_end:,
      reviews_done:,
      new_introduced:,
      due_now:,
    ))
  }

  "-- The current study day's bounds, as epoch seconds, and one track's counts
-- within it: reviews done, cards introduced, and cards due now. $2 is the
-- timezone, $3 the day_start_hour the day rolls over at, $4 now.
with bounds as (
  select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                           - make_interval(hours => $3))
         + make_interval(hours => $3) as local_start
)
select
  extract(epoch from (local_start at time zone $2))::float8 as day_start,
  extract(epoch from ((local_start + interval '1 day') at time zone $2))::float8
    as day_end,
  (select count(*) from reviews r
     join cards rc on rc.id = r.card_id
    where r.user_id = $1 and rc.category = $5
      and r.reviewed_at >= (local_start at time zone $2))::int as reviews_done,
  (select count(*) from cards c
    where c.user_id = $1 and c.category = $5
      and c.introduced_at >= (local_start at time zone $2))::int
    as new_introduced,
  (select count(*) from cards c
    where c.user_id = $1 and c.category = $5
      and not c.suspended
      and c.reps > 0
      and c.due <= to_timestamp($4::float8))::int as due_now
from bounds
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.int(arg_3))
  |> pog.parameter(pog.float(arg_4))
  |> pog.parameter(pog.text(rc_category))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `standings` query
/// defined in `./src/server/study/today/sql/standings.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type StandingsRow {
  StandingsRow(
    track: String,
    cards: Int,
    due_now: Int,
    introduced_today: Int,
    reviews_today: Int,
    parameters: Option(List(Float)),
    desired_retention: Option(Float),
    learning_steps: Option(List(Int)),
    relearning_steps: Option(List(Int)),
    maximum_interval: Option(Int),
    enable_fuzz: Option(Bool),
    new_per_day: Option(Int),
    reviews_per_day: Option(Int),
  )
}

/// Where every track the user has cards in stands today, with that track's
/// settings row. The settings come from a left join, so a track with no row
/// of its own has every one of them null ("?"). $2-$4 as in day_counts.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn standings(
  db: pog.Connection,
  r_user_id: Uuid,
  arg_2: String,
  arg_3: Int,
  arg_4: Float,
) -> Result(pog.Returned(StandingsRow), pog.QueryError) {
  let decoder = {
    use track <- decode.field(0, decode.string)
    use cards <- decode.field(1, decode.int)
    use due_now <- decode.field(2, decode.int)
    use introduced_today <- decode.field(3, decode.int)
    use reviews_today <- decode.field(4, decode.int)
    use parameters <- decode.field(
      5,
      decode.optional(decode.list(decode.float)),
    )
    use desired_retention <- decode.field(6, decode.optional(decode.float))
    use learning_steps <- decode.field(
      7,
      decode.optional(decode.list(decode.int)),
    )
    use relearning_steps <- decode.field(
      8,
      decode.optional(decode.list(decode.int)),
    )
    use maximum_interval <- decode.field(9, decode.optional(decode.int))
    use enable_fuzz <- decode.field(10, decode.optional(decode.bool))
    use new_per_day <- decode.field(11, decode.optional(decode.int))
    use reviews_per_day <- decode.field(12, decode.optional(decode.int))
    decode.success(StandingsRow(
      track:,
      cards:,
      due_now:,
      introduced_today:,
      reviews_today:,
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
      new_per_day:,
      reviews_per_day:,
    ))
  }

  "-- Where every track the user has cards in stands today, with that track's
-- settings row. The settings come from a left join, so a track with no row
-- of its own has every one of them null (\"?\"). $2-$4 as in day_counts.
with bounds as (
  select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                           - make_interval(hours => $3))
         + make_interval(hours => $3) as local_start
)
select c.category as track,
       count(*)::int as cards,
       count(*) filter (
         where not c.suspended and c.reps > 0
           and c.due <= to_timestamp($4::float8))::int as due_now,
       count(*) filter (
         where c.introduced_at
               >= (select local_start at time zone $2 from bounds))::int
         as introduced_today,
       (select count(*) from reviews r
          join cards rc on rc.id = r.card_id
         where r.user_id = $1 and rc.category = c.category
           and r.reviewed_at
               >= (select local_start at time zone $2 from bounds))::int
         as reviews_today,
       t.parameters as \"parameters?\",
       t.desired_retention as \"desired_retention?\",
       t.learning_steps as \"learning_steps?\",
       t.relearning_steps as \"relearning_steps?\",
       t.maximum_interval as \"maximum_interval?\",
       t.enable_fuzz as \"enable_fuzz?\",
       t.new_per_day as \"new_per_day?\",
       t.reviews_per_day as \"reviews_per_day?\"
  from cards c
  left join track_settings t
         on t.user_id = c.user_id and t.track = c.category
 where c.user_id = $1
 group by c.category, t.parameters, t.desired_retention,
          t.learning_steps, t.relearning_steps, t.maximum_interval,
          t.enable_fuzz, t.new_per_day, t.reviews_per_day
 order by c.category
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.int(arg_3))
  |> pog.parameter(pog.float(arg_4))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `timezone_exists` query
/// defined in `./src/server/study/today/sql/timezone_exists.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type TimezoneExistsRow {
  TimezoneExistsRow(known: Bool)
}

/// Whether Postgres knows a timezone by this name.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn timezone_exists(
  db: pog.Connection,
  name: String,
) -> Result(pog.Returned(TimezoneExistsRow), pog.QueryError) {
  let decoder = {
    use known <- decode.field(0, decode.bool)
    decode.success(TimezoneExistsRow(known:))
  }

  "-- Whether Postgres knows a timezone by this name.
select exists (
  select 1 from pg_timezone_names where name = $1
) as known
"
  |> pog.query
  |> pog.parameter(pog.text(name))
  |> pog.returning(decoder)
  |> pog.execute(db)
}
