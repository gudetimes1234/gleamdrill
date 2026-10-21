//// This module contains the code to run the sql queries defined in
//// `./src/server/auth/sql`.
//// > 🐿️ This module was generated automatically using v4.7.0 of
//// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
////

import gleam/dynamic/decode
import pog
import youid/uuid.{type Uuid}

/// A row you get from running the `authenticate` query
/// defined in `./src/server/auth/sql/authenticate.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type AuthenticateRow {
  AuthenticateRow(id: Uuid, email: String)
}

/// Resolves a session token's hash to its user and slides the expiry $2
/// days out, in one statement: an expired session matches nothing.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn authenticate(
  db: pog.Connection,
  token_hash: BitArray,
  arg_2: Int,
) -> Result(pog.Returned(AuthenticateRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
    use email <- decode.field(1, decode.string)
    decode.success(AuthenticateRow(id:, email:))
  }

  "-- Resolves a session token's hash to its user and slides the expiry $2
-- days out, in one statement: an expired session matches nothing.
with touched as (
  update sessions
     set last_seen = now(),
         expires_at = now() + make_interval(days => $2)
   where token_hash = $1
     and expires_at > now()
  returning user_id
)
select u.id, u.email
  from users u
  join touched t on t.user_id = u.id
"
  |> pog.query
  |> pog.parameter(pog.bytea(token_hash))
  |> pog.parameter(pog.int(arg_2))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Forgets a throttling key's attempts, after a successful sign-in.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn clear_attempts(
  db: pog.Connection,
  key: String,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Forgets a throttling key's attempts, after a successful sign-in.
delete from login_attempts
 where key = $1
"
  |> pog.query
  |> pog.parameter(pog.text(key))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Stores a new session by the SHA-256 of its token, expiring in $3 days.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn create_session(
  db: pog.Connection,
  arg_1: BitArray,
  arg_2: Uuid,
  arg_3: Int,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Stores a new session by the SHA-256 of its token, expiring in $3 days.
insert into sessions (token_hash, user_id, expires_at)
values ($1, $2, now() + make_interval(days => $3))
"
  |> pog.query
  |> pog.parameter(pog.bytea(arg_1))
  |> pog.parameter(pog.text(uuid.to_string(arg_2)))
  |> pog.parameter(pog.int(arg_3))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Ends one session, by the hash of its token.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn delete_session(
  db: pog.Connection,
  token_hash: BitArray,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Ends one session, by the hash of its token.
delete from sessions
 where token_hash = $1
"
  |> pog.query
  |> pog.parameter(pog.bytea(token_hash))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `find_credentials` query
/// defined in `./src/server/auth/sql/find_credentials.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type FindCredentialsRow {
  FindCredentialsRow(id: Uuid, email: String, password_hash: String)
}

/// An account and its password hash, by normalised email.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn find_credentials(
  db: pog.Connection,
  email: String,
) -> Result(pog.Returned(FindCredentialsRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
    use email <- decode.field(1, decode.string)
    use password_hash <- decode.field(2, decode.string)
    decode.success(FindCredentialsRow(id:, email:, password_hash:))
  }

  "-- An account and its password hash, by normalised email.
select id, email, password_hash
  from users
 where email = $1
"
  |> pog.query
  |> pog.parameter(pog.text(email))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Seeds a new account's settings row: the account-wide knobs only.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn insert_settings(
  db: pog.Connection,
  arg_1: Uuid,
  arg_2: String,
  arg_3: Int,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Seeds a new account's settings row: the account-wide knobs only.
insert into settings (user_id, timezone, day_start_hour)
values ($1, $2, $3)
"
  |> pog.query
  |> pog.parameter(pog.text(uuid.to_string(arg_1)))
  |> pog.parameter(pog.text(arg_2))
  |> pog.parameter(pog.int(arg_3))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `insert_user` query
/// defined in `./src/server/auth/sql/insert_user.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type InsertUserRow {
  InsertUserRow(id: Uuid, email: String)
}

/// Creates an account. The unique index on email is what says "already
/// registered" (users_email_key).
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn insert_user(
  db: pog.Connection,
  arg_1: String,
  arg_2: String,
) -> Result(pog.Returned(InsertUserRow), pog.QueryError) {
  let decoder = {
    use id <- decode.field(0, uuid_decoder())
    use email <- decode.field(1, decode.string)
    decode.success(InsertUserRow(id:, email:))
  }

  "-- Creates an account. The unique index on email is what says \"already
-- registered\" (users_email_key).
insert into users (email, password_hash)
values ($1, $2)
returning id, email
"
  |> pog.query
  |> pog.parameter(pog.text(arg_1))
  |> pog.parameter(pog.text(arg_2))
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// Drops every session that has already expired.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn prune_sessions(
  db: pog.Connection,
) -> Result(pog.Returned(Nil), pog.QueryError) {
  let decoder = decode.map(decode.dynamic, fn(_) { Nil })

  "-- Drops every session that has already expired.
delete from sessions
 where expires_at < now()
"
  |> pog.query
  |> pog.returning(decoder)
  |> pog.execute(db)
}

/// A row you get from running the `record_attempt` query
/// defined in `./src/server/auth/sql/record_attempt.sql`.
///
/// > 🐿️ This type definition was generated automatically using v4.7.0 of the
/// > [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub type RecordAttemptRow {
  RecordAttemptRow(attempts: Int)
}

/// Counts one attempt against a throttling key and answers with the count in
/// the current window; a window older than $2 minutes starts over at 1.
///
/// > 🐿️ This function was generated automatically using v4.7.0 of
/// > the [squirrel package](https://github.com/giacomocavalieri/squirrel).
///
pub fn record_attempt(
  db: pog.Connection,
  arg_1: String,
  arg_2: Int,
) -> Result(pog.Returned(RecordAttemptRow), pog.QueryError) {
  let decoder = {
    use attempts <- decode.field(0, decode.int)
    decode.success(RecordAttemptRow(attempts:))
  }

  "-- Counts one attempt against a throttling key and answers with the count in
-- the current window; a window older than $2 minutes starts over at 1.
insert into login_attempts (key, attempts, window_start)
values ($1, 1, now())
on conflict (key) do update set
  attempts = case
    when login_attempts.window_start < now() - make_interval(mins => $2)
    then 1 else login_attempts.attempts + 1 end,
  window_start = case
    when login_attempts.window_start < now() - make_interval(mins => $2)
    then now() else login_attempts.window_start end
returning attempts
"
  |> pog.query
  |> pog.parameter(pog.text(arg_1))
  |> pog.parameter(pog.int(arg_2))
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
