//// This module contains the code to run the sql queries defined in
//// `./src/server/reminders/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import pog
import youid/uuid.{type Uuid}

/// Takes a user's reminder slot for one day, or touches nothing when it is
/// taken. The day travels as text: pog types a $n::date parameter as a date
/// and refuses a string for it, so the cast happens here.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn claim_reminder(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Takes a user's reminder slot for one day, or touches nothing when it is
-- taken. The day travels as text: pog types a $n::date parameter as a date
-- and refuses a string for it, so the cast happens here.
insert into reminders_sent (user_id, day)
values ($1, to_date($2::text, 'YYYY-MM-DD'))
on conflict (user_id, day) do nothing
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `owed_reminders` query
/// defined in `./src/server/reminders/sql/owed_reminders.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type OwedRemindersRow {
  OwedRemindersRow(id: Uuid, email: String, day: String, due: Int)
}

/// Users whose reminder hour is the current hour of their own day, who have
/// not had today's mail, and who have something due. day is their local
/// date as text (YYYY-MM-DD), the key reminders_sent is claimed under.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn owed_reminders(
  db: pog.Connection,
) -> Result(pog.Returned(OwedRemindersRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
    use email <- decode.field(1, decode.string)
    use day <- decode.field(2, decode.string)
    use due <- decode.field(3, decode.int)
    decode.success(OwedRemindersRow(id:, email:, day:, due:))
  }

  "-- Users whose reminder hour is the current hour of their own day, who have
-- not had today's mail, and who have something due. day is their local
-- date as text (YYYY-MM-DD), the key reminders_sent is claimed under.
select id, email, day, due
  from (
    select u.id, u.email,
           (now() at time zone s.timezone)::date::text as day,
           (select count(*) from cards c
             where c.user_id = u.id and not c.suspended
               and c.reps > 0 and c.due <= now())::int as due
      from users u
      join settings s on s.user_id = u.id
     where s.reminder_hour is not null
       and extract(hour from now() at time zone s.timezone)::int
           = s.reminder_hour
       and not exists (
         select 1 from reminders_sent r
          where r.user_id = u.id
            and r.day = (now() at time zone s.timezone)::date)
  ) owed
 where due > 0
"
  |> pog.query
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Gives a claimed slot back after a failed send, so the next tick retries.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn release_reminder(
  db: pog.Connection,
  user_id: Uuid,
  arg_2: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Gives a claimed slot back after a failed send, so the next tick retries.
delete from reminders_sent
 where user_id = $1 and day = to_date($2::text, 'YYYY-MM-DD')
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(user_id)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

// --- Encoding/decoding utils -------------------------------------------------

/// A decoder to decode `Uuid`s coming from a Postgres query.
///
fn uuid_decoder() {
  use bit_array <- decode.then(decode.bit_array)
  case uuid.from_bit_array(bit_array) {
    Ok(uuid) -> decode.success(uuid)
    Error(_) -> decode.failure(uuid.v7(), "Uuid")
  }
}
