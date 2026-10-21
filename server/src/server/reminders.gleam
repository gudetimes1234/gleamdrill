//// The daily "N problems due" mail.
////
//// One process, started at boot when RESEND_API_KEY is set, wakes every
//// fifteen minutes and asks the database who wants a reminder at this hour
//// of their local day and has something due. Each one gets a plain-text
//// mail through Resend. A row in `reminders_sent` is claimed *before* the
//// mail goes out and dropped if sending fails, so a restart mid-tick, or a
//// second instance, cannot send the same day's mail twice, and a failed
//// send is retried on the next tick.
////
//// The SQL lives in `reminders/sql/*.sql`; `gleam run -m squirrel`
//// generates `reminders/sql.gleam` from it.

import gleam/erlang/process
import gleam/http
import gleam/http/request
import gleam/httpc
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/otp/actor
import gleam/otp/supervision.{type ChildSpecification}
import gleam/result
import gleam/string
import pog
import server/config.{type Config}
import server/reminders/sql
import wisp
import youid/uuid.{type Uuid}

/// Fifteen minutes: often enough that "8 o'clock" means the first quarter
/// hour of eight, rarely enough to be nothing to the database.
const tick_ms = 900_000

/// Someone owed a reminder right now.
pub type Reminder {
  Reminder(user_id: Uuid, email: String, day: String, due: Int)
}

/// The reminder loop as a supervised actor, or nothing when mail is off.
/// The actor ticks once on start and then every `tick_ms`; a crash in a tick
/// restarts it, and the restart ticks again straight away -- `claim` is what
/// keeps that from mailing anyone twice.
pub fn supervised(
  db: pog.Connection,
  config: Config,
) -> Option(ChildSpecification(process.Subject(Tick))) {
  case config.resend_api_key {
    None -> {
      wisp.log_info(
        "reminders: RESEND_API_KEY is not set, no mail will be sent",
      )
      None
    }
    Some(key) -> {
      wisp.log_info(
        "reminders: on, from " <> config.reminder_from <> ", every 15 minutes",
      )
      Some(supervision.worker(fn() { start(db, config, key) }))
    }
  }
}

/// The actor's only message: time to look for reminders.
pub type Tick {
  Tick
}

fn start(
  db: pog.Connection,
  config: Config,
  key: String,
) -> Result(actor.Started(process.Subject(Tick)), actor.StartError) {
  actor.new_with_initialiser(1000, fn(self) {
    process.send(self, Tick)
    actor.initialised(self) |> actor.returning(self) |> Ok
  })
  |> actor.on_message(fn(self, _tick: Tick) {
    tick(db, config, key)
    process.send_after(self, tick_ms, Tick)
    actor.continue(self)
  })
  |> actor.start
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
  sql.owed_reminders(db)
  |> result.map(fn(returned) {
    list.map(returned.rows, fn(row: sql.OwedRemindersRow) {
      Reminder(user_id: row.id, email: row.email, day: row.day, due: row.due)
    })
  })
  |> result.map_error(describe)
}

/// True when this call took the day's slot; False when it was taken.
fn claim(db: pog.Connection, reminder: Reminder) -> Result(Bool, String) {
  sql.claim_reminder(db, reminder.user_id, reminder.day)
  |> result.map(fn(returned) { returned.count == 1 })
  |> result.map_error(describe)
}

fn release(db: pog.Connection, reminder: Reminder) -> Nil {
  let _ = sql.release_reminder(db, reminder.user_id, reminder.day)
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
