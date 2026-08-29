//// AlgoDrill backend entry point.

import gleam/erlang/process
import gleam/io
import gleam/result
import mist
import server/config
import server/db
import server/router
import server/web
import wisp
import wisp/wisp_mist

pub fn main() -> Nil {
  wisp.configure_logger()

  case start() {
    Ok(_) -> process.sleep_forever()
    Error(message) -> {
      io.println_error("algodrill-server failed to start: " <> message)
      halt(1)
    }
  }
}

fn start() -> Result(Nil, String) {
  use config <- result.try(config.load())
  use database <- result.try(db.start(config.database_url, 10))
  // Migrating at boot keeps a single-instance deployment honest: the schema is
  // always what this build expects. It would need rethinking before running
  // more than one instance at a time.
  use _ <- result.try(db.migrate(database))

  let context = web.Context(db: database, config: config)
  let handler = fn(request) { router.handle(request, context) }

  use _ <- result.try(
    wisp_mist.handler(handler, config.secret_key_base)
    |> mist.new
    |> mist.port(config.port)
    |> mist.bind(config.bind)
    |> mist.start
    |> result.replace_error("could not bind port"),
  )

  io.println(
    "algodrill-server listening on "
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
