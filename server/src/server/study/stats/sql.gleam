//// This module contains the code to run the sql queries defined in
//// `./src/server/study/stats/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `due_forecast` query
/// defined in `./src/server/study/stats/sql/due_forecast.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type DueForecastRow {
  DueForecastRow(days_ahead: Int, count: Int)
}

/// How many of one track's cards fall due on each of the next 30 study days;
/// anything overdue counts as today. $2 and $3 as in review_history.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn due_forecast(
  db: pog.Connection,
  user_id: Uuid,
  arg_2: String,
  arg_3: Int,
  category: String,
) -> Result(pog.Returned(DueForecastRow), pog.QueryError) {
  let decoder = {
    use days_ahead <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(DueForecastRow(days_ahead:, count:))
  }

  "-- How many of one track's cards fall due on each of the next 30 study days;
-- anything overdue counts as today. $2 and $3 as in review_history.
with study_day as (
  select date_trunc('day', (now() at time zone $2)
                           - make_interval(hours => $3))::date as today
)
select greatest(
         0,
         date_trunc('day', (due at time zone $2)
                           - make_interval(hours => $3))::date
         - (select today from study_day)
       ) as days_ahead,
       count(*)::int as count
  from cards
 where user_id = $1 and category = $4
   and not suspended
   and due < now() + interval '30 days'
 group by 1
 order by 1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.int(arg_3))
  |> pog.parameter(pog.text(category))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `review_history` query
/// defined in `./src/server/study/stats/sql/review_history.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type ReviewHistoryRow {
  ReviewHistoryRow(days_ago: Int, total: Int, correct: Int)
}

/// A year of one track's reviews, tallied per study day as "days ago". $2 is
/// the timezone and $3 the day_start_hour the study day rolls over at.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn review_history(
  db: pog.Connection,
  r_user_id: Uuid,
  arg_2: String,
  arg_3: Int,
  c_ategory: String,
) -> Result(pog.Returned(ReviewHistoryRow), pog.QueryError) {
  let decoder = {
    use days_ago <- decode.field(0, decode.int)
    use total <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(ReviewHistoryRow(days_ago:, total:, correct:))
  }

  "-- A year of one track's reviews, tallied per study day as \"days ago\". $2 is
-- the timezone and $3 the day_start_hour the study day rolls over at.
with study_day as (
  select date_trunc('day', (now() at time zone $2)
                           - make_interval(hours => $3))::date as today
)
select (select today from study_day)
       - date_trunc('day', (reviewed_at at time zone $2)
                           - make_interval(hours => $3))::date as days_ago,
       count(*)::int as total,
       count(*) filter (where r.rating > 1)::int as correct
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1 and c.category = $4
   and r.reviewed_at >= now() - interval '365 days'
 group by 1
 order by 1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.int(arg_3))
  |> pog.parameter(pog.text(c_ategory))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `review_totals` query
/// defined in `./src/server/study/stats/sql/review_totals.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type ReviewTotalsRow {
  ReviewTotalsRow(total: Int, mature: Int, correct: Int)
}

/// One track's review count, how many were of mature cards, and how many of
/// those passed. A review reaches a track only through its card.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn review_totals(
  db: pog.Connection,
  r_user_id: Uuid,
  c_ategory: String,
) -> Result(pog.Returned(ReviewTotalsRow), pog.QueryError) {
  let decoder = {
    use total <- decode.field(0, decode.int)
    use mature <- decode.field(1, decode.int)
    use correct <- decode.field(2, decode.int)
    decode.success(ReviewTotalsRow(total:, mature:, correct:))
  }

  "-- One track's review count, how many were of mature cards, and how many of
-- those passed. A review reaches a track only through its card.
select
  (select count(*) from reviews r join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2)::int as total,
  (select count(*) from reviews r join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2
      and r.state_before = 2)::int as mature,
  (select count(*) from reviews r join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2
      and r.state_before = 2 and r.rating > 1)::int as correct
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(r_user_id)))
  |> pog.parameter(pog.text(c_ategory))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `state_counts` query
/// defined in `./src/server/study/stats/sql/state_counts.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type StateCountsRow {
  StateCountsRow(state: Int, count: Int)
}

/// How many of one track's cards are in each FSRS state.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn state_counts(
  db: pog.Connection,
  user_id: Uuid,
  category: String,
) -> Result(pog.Returned(StateCountsRow), pog.QueryError) {
  let decoder = {
    use state <- decode.field(0, decode.int)
    use count <- decode.field(1, decode.int)
    decode.success(StateCountsRow(state:, count:))
  }

  "-- How many of one track's cards are in each FSRS state.
select state, count(*)::int as count
  from cards
 where user_id = $1 and category = $2
 group by state
 order by state
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(category))
  |> pog.returning(decoder)
  |> pog.execute(db)
}
