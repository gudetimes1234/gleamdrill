//// GleamDrill backend entry point.

import gleam/erlang/process
import gleam/io
import gleam/option.{None, Some}
import gleam/otp/static_supervisor
import gleam/result
import gleam/string
import mist
import server/config
import server/db
import server/reminders
import server/router
import server/run_gate
import server/web
import wisp
import wisp/wisp_mist

pub fn main() -> Nil {
  wisp.configure_logger()

  case start() {
    Ok(_) -> process.sleep_forever()
    Error(message) -> {
      io.println_error("gleamdrill-server failed to start: " <> message)
      halt(1)
    }
  }
}

/// The whole server is one supervision tree, started in order: the pool,
/// the migrations, the reminder loop when mail is on, then HTTP. A child
/// that fails to start stops the boot; one that crashes later is restarted
/// on its own.
fn start() -> Result(Nil, String) {
  use config <- result.try(config.load())
  use #(pool, database) <- result.try(db.config(config.database_url, 10))
  run_gate.init()

  let context = web.Context(db: database, config: config)
  let handler = fn(request) { router.handle(request, context) }
  let http =
    wisp_mist.handler(handler, config.secret_key_base)
    |> mist.new
    |> mist.port(config.port)
    |> mist.bind(config.bind)
    |> mist.supervised

  let tree =
    static_supervisor.new(static_supervisor.OneForOne)
    |> static_supervisor.add(db.supervised(pool))
    |> static_supervisor.add(db.migration(database))
  let tree = case reminders.supervised(database, config) {
    Some(child) -> static_supervisor.add(tree, child)
    None -> tree
  }
  use _ <- result.try(
    tree
    |> static_supervisor.add(http)
    |> static_supervisor.start
    |> result.map_error(fn(error) {
      "the supervision tree did not start: " <> string.inspect(error)
    }),
  )

  io.println(
    "gleamdrill-server listening on "
    <> config.bind
    <> ":"
    <> int_to_string(config.port),
  )
  Ok(Nil)
}

@external(erlang, "erlang", "halt")
fn halt(code: Int) -> Nil

@external(erlang, "erlang", "integer_to_binary")
fn int_to_string(value: Int) -> String
