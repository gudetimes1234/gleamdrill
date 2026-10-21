//// This module contains the code to run the sql queries defined in
//// `./src/server/study/track/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `busiest_track` query
/// defined in `./src/server/study/track/sql/busiest_track.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type BusiestTrackRow {
  BusiestTrackRow(category: String)
}

/// The track the user has most cards in, ties broken by name.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn busiest_track(
  db: pog.Connection,
  user_id: Uuid,
) -> Result(pog.Returned(BusiestTrackRow), pog.QueryError) {
  let decoder = {
    use category <- decode.field(0, decode.string)
    decode.success(BusiestTrackRow(category:))
  }

  "-- The track the user has most cards in, ties broken by name.
select category
  from cards
 where user_id = $1
 group by category
 order by count(*) desc, category
 limit 1
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.returning(decoder)
  |> pog.execute(db)
}
