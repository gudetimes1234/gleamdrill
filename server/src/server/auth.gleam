//// Accounts, passwords and sessions.
////
//// Security decisions worth knowing about, all of them deliberate:
////
////   * Passwords are hashed with Argon2id (antigone's defaults).
////   * Only the SHA-256 of a session token is stored. A dump of `sessions`
////     yields nothing anyone can log in with.
////   * Login failures are indistinguishable from each other -- same error,
////     and an unknown email still pays the cost of a hash verification, so
////     response time does not reveal whether an account exists.
////   * Login attempts are throttled per IP *and* per email.

import antigone
import fsrs
import gleam/bit_array
import gleam/bool
import gleam/crypto
import gleam/dynamic/decode
import gleam/list
import gleam/result
import gleam/string
import pog
import wire

/// The authenticated account. Aliased into `wire` because it is also what
/// `/api/me` and every session response send back.
pub type User =
  wire.User

pub type AuthError {
  /// Deliberately covers "no such account" and "wrong password" both.
  InvalidCredentials
  EmailTaken
  InvalidEmail
  WeakPassword(reason: String)
  TooManyAttempts
  SessionExpired
  DatabaseError(String)
}

/// Passwords shorter than this are rejected outright. Length beats
/// composition rules, so there are no character-class requirements.
const min_password_length = 12

/// Failed logins allowed per key before the door shuts.
const max_attempts = 10

/// How long a throttling window lasts, in minutes.
const attempt_window_minutes = 15

// --- validation ------------------------------------------------------------

/// Emails are stored lowercase and trimmed so that uniqueness is
/// case-insensitive without needing the `citext` extension.
pub fn normalise_email(raw: String) -> String {
  raw |> string.trim |> string.lowercase
}

fn validate_email(email: String) -> Result(String, AuthError) {
  let email = normalise_email(email)
  // Deliberately minimal. Anything stricter rejects addresses that are
  // genuinely valid; deliverability is proven by sending mail, not by regex.
  case string.contains(email, "@"), string.length(email) {
    True, length if length >= 3 && length <= 320 -> Ok(email)
    _, _ -> Error(InvalidEmail)
  }
}

fn validate_password(password: String) -> Result(String, AuthError) {
  case string.length(password) {
    length if length < min_password_length ->
      Error(WeakPassword(
        "must be at least "
        <> int_to_string(min_password_length)
        <> " characters",
      ))
    length if length > 1024 ->
      Error(WeakPassword("must be at most 1024 characters"))
    _ -> Ok(password)
  }
}

// --- tokens ----------------------------------------------------------------

/// 32 bytes of CSPRNG output, base64url encoded without padding.
fn generate_token() -> String {
  crypto.strong_random_bytes(32)
  |> bit_array.base64_url_encode(False)
}

/// What actually goes in the database. The token itself is shown to the client
/// once and never persisted.
fn token_digest(token: String) -> BitArray {
  crypto.hash(crypto.Sha256, <<token:utf8>>)
}

// --- signup ----------------------------------------------------------------

pub fn signup(
  db: pog.Connection,
  email: String,
  password: String,
  timezone: String,
  session_days: Int,
) -> Result(#(User, String), AuthError) {
  use email <- result.try(validate_email(email))
  use password <- result.try(validate_password(password))
  let password_hash = antigone.hash(antigone.hasher(), <<password:utf8>>)

  // The user row and their scheduler settings are created together: a user
  // without settings would break every subsequent review.
  use user <- result.try(
    pog.transaction(db, fn(tx) {
      use user <- result.try(insert_user(tx, email, password_hash))
      use _ <- result.try(insert_default_settings(tx, user.id, timezone))
      Ok(user)
    })
    |> result.map_error(flatten_transaction_error),
  )

  use token <- result.try(create_session(db, user.id, session_days))
  Ok(#(user, token))
}

/// The browser's IANA zone. Study days roll over at 04:00 *local*, so
/// without this every account would roll over at 04:00 UTC -- around
/// midnight in the US, which is exactly when someone is still studying.
/// Already validated by the caller; unknown zones arrive here as "UTC".
fn insert_user(
  db: pog.Connection,
  email: String,
  password_hash: String,
) -> Result(User, AuthError) {
  pog.query(
    "insert into users (email, password_hash)
     values ($1, $2)
     returning id::text, email",
  )
  |> pog.parameter(pog.text(email))
  |> pog.parameter(pog.text(password_hash))
  |> pog.returning(user_decoder())
  |> pog.execute(db)
  |> result.map_error(fn(error) {
    case error {
      // The unique index on `email` is the single source of truth for
      // "already registered" -- checking first would be a race.
      pog.ConstraintViolated(_, "users_email_key", _) -> EmailTaken
      other -> DatabaseError(string.inspect(other))
    }
  })
  |> result.try(first_row(_, DatabaseError("insert returned no user")))
}

fn insert_default_settings(
  db: pog.Connection,
  user_id: String,
  timezone: String,
) -> Result(Nil, AuthError) {
  pog.query(
    "insert into settings (user_id, parameters, timezone)
     values ($1::uuid, $2, $3)",
  )
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.array(pog.float, fsrs.default_parameters))
  |> pog.parameter(pog.text(timezone))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- login -----------------------------------------------------------------

pub fn login(
  db: pog.Connection,
  email: String,
  password: String,
  client_ip: String,
  session_days: Int,
) -> Result(#(User, String), AuthError) {
  let email = normalise_email(email)

  // Count against both keys before doing any work, so a lockout cannot be
  // dodged by rotating one of them.
  use _ <- result.try(record_attempt(db, "ip:" <> client_ip))
  use _ <- result.try(record_attempt(db, "email:" <> email))

  use candidate <- result.try(find_credentials(db, email))

  let authenticated = case candidate {
    Ok(#(user, hash)) ->
      case antigone.verify(<<password:utf8>>, hash) {
        True -> Ok(user)
        False -> Error(InvalidCredentials)
      }
    Error(Nil) -> {
      // No such account. Burn a comparable amount of time anyway, so response
      // latency does not disclose which emails are registered.
      antigone.fake_verify(antigone.hasher())
      Error(InvalidCredentials)
    }
  }

  use user <- result.try(authenticated)
  use _ <- result.try(clear_attempts(db, "ip:" <> client_ip))
  use _ <- result.try(clear_attempts(db, "email:" <> email))
  use token <- result.try(create_session(db, user.id, session_days))
  Ok(#(user, token))
}

fn find_credentials(
  db: pog.Connection,
  email: String,
) -> Result(Result(#(User, String), Nil), AuthError) {
  pog.query("select id::text, email, password_hash from users where email = $1")
  |> pog.parameter(pog.text(email))
  |> pog.returning({
    use id <- decode.field(0, decode.string)
    use email <- decode.field(1, decode.string)
    use hash <- decode.field(2, decode.string)
    decode.success(#(wire.User(id:, email:), hash))
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.map(fn(returned) { list.first(returned.rows) })
}

// --- throttling ------------------------------------------------------------

/// Records one attempt against `key` and fails if the window is exhausted.
/// The increment and the check are one statement, so concurrent attempts
/// cannot slip past the limit.
fn record_attempt(db: pog.Connection, key: String) -> Result(Nil, AuthError) {
  pog.query(
    "insert into login_attempts (key, attempts, window_start)
     values ($1, 1, now())
     on conflict (key) do update set
       attempts = case
         when login_attempts.window_start < now() - make_interval(mins => $2)
         then 1 else login_attempts.attempts + 1 end,
       window_start = case
         when login_attempts.window_start < now() - make_interval(mins => $2)
         then now() else login_attempts.window_start end
     returning attempts",
  )
  |> pog.parameter(pog.text(key))
  |> pog.parameter(pog.int(attempt_window_minutes))
  |> pog.returning({
    use attempts <- decode.field(0, decode.int)
    decode.success(attempts)
  })
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.try(fn(returned) {
    case list.first(returned.rows) {
      Ok(attempts) ->
        bool.guard(attempts > max_attempts, Error(TooManyAttempts), fn() {
          Ok(Nil)
        })
      Error(Nil) -> Ok(Nil)
    }
  })
}

fn clear_attempts(db: pog.Connection, key: String) -> Result(Nil, AuthError) {
  pog.query("delete from login_attempts where key = $1")
  |> pog.parameter(pog.text(key))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- sessions --------------------------------------------------------------

fn create_session(
  db: pog.Connection,
  user_id: String,
  session_days: Int,
) -> Result(String, AuthError) {
  let token = generate_token()
  pog.query(
    "insert into sessions (token_hash, user_id, expires_at)
     values ($1, $2::uuid, now() + make_interval(days => $3))",
  )
  |> pog.parameter(pog.bytea(token_digest(token)))
  |> pog.parameter(pog.text(user_id))
  |> pog.parameter(pog.int(session_days))
  |> pog.execute(db)
  |> result.replace(token)
  |> result.map_error(database_error)
}

/// Resolves a bearer token to its user, sliding the expiry at the same time.
///
/// One statement does both: the `update` filters on `expires_at > now()`, so
/// an expired session simply matches nothing and no user comes back.
pub fn authenticate(
  db: pog.Connection,
  token: String,
  session_days: Int,
) -> Result(User, AuthError) {
  pog.query(
    "with touched as (
       update sessions
          set last_seen = now(),
              expires_at = now() + make_interval(days => $2)
        where token_hash = $1
          and expires_at > now()
        returning user_id
     )
     select u.id::text, u.email
       from users u
       join touched t on t.user_id = u.id",
  )
  |> pog.parameter(pog.bytea(token_digest(token)))
  |> pog.parameter(pog.int(session_days))
  |> pog.returning(user_decoder())
  |> pog.execute(db)
  |> result.map_error(database_error)
  |> result.try(first_row(_, SessionExpired))
}

pub fn logout(db: pog.Connection, token: String) -> Result(Nil, AuthError) {
  pog.query("delete from sessions where token_hash = $1")
  |> pog.parameter(pog.bytea(token_digest(token)))
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

/// Drops sessions that have already expired. Nothing depends on this for
/// correctness -- `authenticate` filters on expiry -- it just stops the table
/// growing without bound.
pub fn prune_sessions(db: pog.Connection) -> Result(Nil, AuthError) {
  pog.query("delete from sessions where expires_at < now()")
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- shared plumbing -------------------------------------------------------

fn user_decoder() -> decode.Decoder(User) {
  use id <- decode.field(0, decode.string)
  use email <- decode.field(1, decode.string)
  decode.success(wire.User(id:, email:))
}

fn first_row(
  returned: pog.Returned(row),
  when_empty: AuthError,
) -> Result(row, AuthError) {
  list.first(returned.rows) |> result.replace_error(when_empty)
}

fn database_error(error: pog.QueryError) -> AuthError {
  DatabaseError(string.inspect(error))
}

fn flatten_transaction_error(
  error: pog.TransactionError(AuthError),
) -> AuthError {
  case error {
    pog.TransactionRolledBack(reason) -> reason
    pog.TransactionQueryError(query_error) -> database_error(query_error)
  }
}

@external(erlang, "erlang", "integer_to_binary")
fn int_to_string(value: Int) -> String
