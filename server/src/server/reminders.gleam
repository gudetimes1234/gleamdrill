//// The daily "N problems due" mail.
////
//// One process, started at boot when RESEND_API_KEY is set, wakes every
//// fifteen minutes and asks the database who wants a reminder at this hour
//// of their local day and has something due. Each one gets a plain-text
//// mail through Resend. A row in `reminders_sent` is claimed *before* the
//// mail goes out and dropped if sending fails, so a restart mid-tick, or a
//// second instance, cannot send the same day's mail twice, and a failed
//// send is retried on the next tick.

import gleam/dynamic/decode
import gleam/erlang/process
import gleam/http
import gleam/http/request
import gleam/httpc
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/string
import pog
import server/config.{type Config}
import wisp

/// Fifteen minutes: often enough that "8 o'clock" means the first quarter
/// hour of eight, rarely enough to be nothing to the database.
const tick_ms = 900_000

/// Someone owed a reminder right now.
pub type Reminder {
  Reminder(user_id: String, email: String, day: String, due: Int)
}

pub fn start(db: pog.Connection, config: Config) -> Nil {
  case config.resend_api_key {
    None ->
      wisp.log_info(
        "reminders: RESEND_API_KEY is not set, no mail will be sent",
      )
    Some(key) -> {
      wisp.log_info(
        "reminders: on, from " <> config.reminder_from <> ", every 15 minutes",
      )
      process.spawn_unlinked(fn() { loop(db, config, key) })
      Nil
    }
  }
}

fn loop(db: pog.Connection, config: Config, key: String) -> Nil {
  tick(db, config, key)
  process.sleep(tick_ms)
  loop(db, config, key)
}

/// One pass: everyone due a reminder at this hour gets one.
pub fn tick(db: pog.Connection, config: Config, key: String) -> Nil {
  case due_now(db) {
    Error(message) -> wisp.log_error("reminders: " <> message)
    Ok(reminders) ->
      list.each(reminders, fn(reminder) {
        case claim(db, reminder) {
          // Claimed by another instance, or already sent today.
          Ok(False) -> Nil
          Error(message) -> wisp.log_error("reminders: " <> message)
          Ok(True) ->
            case send(config, key, reminder) {
              Ok(Nil) ->
                wisp.log_info(
                  "reminders: sent to "
                  <> reminder.email
                  <> " ("
                  <> int.to_string(reminder.due)
                  <> " due)",
                )
              Error(message) -> {
                wisp.log_error(
                  "reminders: " <> reminder.email <> ": " <> message,
                )
                release(db, reminder)
              }
            }
        }
      })
  }
}

/// Users whose reminder hour is the current hour of their own day, who
/// have not had today's mail, and who have something due.
pub fn due_now(db: pog.Connection) -> Result(List(Reminder), String) {
  pog.query(
    "select id, email, day, due from (
       select u.id::text as id, u.email,
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
     where due > 0",
  )
  |> pog.returning({
    use user_id <- decode.field(0, decode.string)
    use email <- decode.field(1, decode.string)
    use day <- decode.field(2, decode.string)
    use due <- decode.field(3, decode.int)
    decode.success(Reminder(user_id:, email:, day:, due:))
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(describe)
}

/// True when this call took the day's slot; False when it was taken.
fn claim(db: pog.Connection, reminder: Reminder) -> Result(Bool, String) {
  pog.query(
    // The day travels as text: pog types a `$n::date` parameter as a date
    // and refuses a string for it, so the cast happens on the SQL side.
    "insert into reminders_sent (user_id, day)
     values ($1::uuid, to_date($2::text, 'YYYY-MM-DD'))
     on conflict (user_id, day) do nothing",
  )
  |> pog.parameter(pog.text(reminder.user_id))
  |> pog.parameter(pog.text(reminder.day))
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.count == 1 })
  |> result.map_error(describe)
}

fn release(db: pog.Connection, reminder: Reminder) -> Nil {
  let _ =
    pog.query(
      "delete from reminders_sent
        where user_id = $1::uuid and day = to_date($2::text, 'YYYY-MM-DD')",
    )
    |> pog.parameter(pog.text(reminder.user_id))
    |> pog.parameter(pog.text(reminder.day))
    |> pog.execute(db)
  Nil
}

/// One POST to Resend. Anything but a 2xx is an error worth the log.
fn send(
  config: Config,
  key: String,
  reminder: Reminder,
) -> Result(Nil, String) {
  let payload =
    json.object([
      #("from", json.string(config.reminder_from)),
      #("to", json.array([reminder.email], json.string)),
      #("subject", json.string(subject(reminder.due))),
      #("text", json.string(body(reminder.due, config.app_url))),
    ])
    |> json.to_string
  let response =
    request.new()
    |> request.set_method(http.Post)
    |> request.set_scheme(http.Https)
    |> request.set_host("api.resend.com")
    |> request.set_path("/emails")
    |> request.set_header("authorization", "Bearer " <> key)
    |> request.set_header("content-type", "application/json")
    |> request.set_body(payload)
    |> httpc.send
  case response {
    Error(_) -> Error("could not reach Resend")
    Ok(response) if response.status >= 200 && response.status < 300 -> Ok(Nil)
    Ok(response) ->
      Error(
        "Resend answered "
        <> int.to_string(response.status)
        <> ": "
        <> response.body,
      )
  }
}

pub fn subject(due: Int) -> String {
  case due {
    1 -> "1 problem is due on GleamDrill"
    n -> int.to_string(n) <> " problems are due on GleamDrill"
  }
}

pub fn body(due: Int, app_url: String) -> String {
  let count = case due {
    1 -> "one problem"
    n -> int.to_string(n) <> " problems"
  }
  "You have "
  <> count
  <> " due today. A sitting is a few minutes; the schedule only holds if it happens.\n\n"
  <> app_url
  <> "\n\nChange the hour, or stop these, in Settings > Reminders."
}

fn describe(error: pog.QueryError) -> String {
  case error {
    pog.PostgresqlError(_, _, message) -> message
    pog.ConstraintViolated(message, _, _) -> message
    pog.ConnectionUnavailable -> "database connection unavailable"
    pog.QueryTimeout -> "database query timed out"
    other -> "database query failed: " <> string.inspect(other)
  }
}
