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
////
//// The SQL lives in `auth/sql/*.sql`; `gleam run -m squirrel` generates
//// `auth/sql.gleam` from it, typed against the live schema.

import antigone
import gleam/bit_array
import gleam/bool
import gleam/crypto
import gleam/list
import gleam/result
import gleam/string
import pog
import server/auth/sql
import wire
import youid/uuid.{type Uuid}

/// The authenticated account, with its id typed. `to_wire` is the shape
/// `/api/me` and every session response send back.
pub type User {
  User(id: Uuid, email: String)
}

pub fn to_wire(user: User) -> wire.User {
  wire.User(id: uuid.to_string(user.id), email: user.email)
}

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
  sql.insert_user(db, email, password_hash)
  |> result.map_error(fn(error) {
    case error {
      // The unique index on `email` is the single source of truth for
      // "already registered" -- checking first would be a race.
      pog.ConstraintViolated(_, "users_email_key", _) -> EmailTaken
      other -> DatabaseError(string.inspect(other))
    }
  })
  |> result.try(first_row(_, DatabaseError("insert returned no user")))
  |> result.map(fn(row: sql.InsertUserRow) {
    User(id: row.id, email: row.email)
  })
}

/// Seed a new account's settings row: the account-wide knobs only.
///
/// The scheduler's numbers live in `track_settings` since migration 8, and a
/// track nobody has opened deliberately has no row there --
/// `wire.default_settings()` answers for it, one authority for what a default
/// is. So signup writes nothing per-track; migration 9 dropped those columns
/// from `settings`, and inserting them here would 500 every signup.
///
/// `day_start_hour` is written out rather than left to the column default for
/// the reason the old version was: a default in the schema is a second copy
/// of the app's, and the two have disagreed before.
fn insert_default_settings(
  db: pog.Connection,
  user_id: Uuid,
  timezone: String,
) -> Result(Nil, AuthError) {
  sql.insert_settings(
    db,
    user_id,
    // The browser's zone, captured at signup -- not a default.
    timezone,
    wire.default_account().day_start_hour,
  )
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
  sql.find_credentials(db, email)
  |> result.map_error(database_error)
  |> result.map(fn(returned) {
    list.first(returned.rows)
    |> result.map(fn(row: sql.FindCredentialsRow) {
      #(User(id: row.id, email: row.email), row.password_hash)
    })
  })
}

// --- throttling ------------------------------------------------------------

fn record_attempt(db: pog.Connection, key: String) -> Result(Nil, AuthError) {
  throttle(db, key, attempt_window_minutes, max_attempts)
}

/// Records one attempt against `key` and fails with `TooManyAttempts` once
/// more than `max_attempts` have landed inside a `window_minutes` window.
/// The increment and the check are one statement, so concurrent attempts
/// cannot slip past the limit. Sign-in uses it per address and per email;
/// server-side runs use it per user.
pub fn throttle(
  db: pog.Connection,
  key: String,
  window_minutes: Int,
  max_attempts: Int,
) -> Result(Nil, AuthError) {
  sql.record_attempt(db, key, window_minutes)
  |> result.map_error(database_error)
  |> result.try(fn(returned) {
    case returned.rows {
      [sql.RecordAttemptRow(attempts:), ..] ->
        bool.guard(attempts > max_attempts, Error(TooManyAttempts), fn() {
          Ok(Nil)
        })
      [] -> Ok(Nil)
    }
  })
}

fn clear_attempts(db: pog.Connection, key: String) -> Result(Nil, AuthError) {
  sql.clear_attempts(db, key)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- sessions --------------------------------------------------------------

fn create_session(
  db: pog.Connection,
  user_id: Uuid,
  session_days: Int,
) -> Result(String, AuthError) {
  let token = generate_token()
  sql.create_session(db, token_digest(token), user_id, session_days)
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
  sql.authenticate(db, token_digest(token), session_days)
  |> result.map_error(database_error)
  |> result.try(first_row(_, SessionExpired))
  |> result.map(fn(row: sql.AuthenticateRow) {
    User(id: row.id, email: row.email)
  })
}

pub fn logout(db: pog.Connection, token: String) -> Result(Nil, AuthError) {
  sql.delete_session(db, token_digest(token))
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

/// Drops sessions that have already expired. Nothing depends on this for
/// correctness -- `authenticate` filters on expiry -- it just stops the table
/// growing without bound.
pub fn prune_sessions(db: pog.Connection) -> Result(Nil, AuthError) {
  sql.prune_sessions(db)
  |> result.replace(Nil)
  |> result.map_error(database_error)
}

// --- shared plumbing -------------------------------------------------------

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
