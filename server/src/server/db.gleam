//// Database pool and migration runner.

import gleam/dynamic/decode
import gleam/erlang/process
import gleam/int
import gleam/list
import gleam/otp/actor
import gleam/otp/supervision.{type ChildSpecification}
import gleam/result
import gleam/string
import pog
import server/migrations.{type Migration}
import youid/uuid.{type Uuid}

/// The pool's configuration and the handle every query goes through. The
/// pool itself is started by the supervision tree (`supervised`); the handle
/// is a name, so it is valid before the pool is up and across its restarts.
pub fn config(
  database_url: String,
  pool_size: Int,
) -> Result(#(pog.Config, pog.Connection), String) {
  let name = process.new_name("gleamdrill_pool")
  use config <- result.try(
    pog.url_config(name, database_url)
    |> result.replace_error(
      "DATABASE_URL is not a valid postgres:// connection URL",
    ),
  )
  Ok(#(pog.pool_size(config, pool_size), pog.named_connection(name)))
}

/// The pool as a child of the supervision tree.
pub fn supervised(config: pog.Config) -> ChildSpecification(pog.Connection) {
  pog.supervised(config)
}

/// The migrations as a one-shot child: started after the pool and before
/// anything that queries, so a schema the build does not expect stops the
/// boot instead of failing requests. It runs once and is not restarted.
pub fn migration(db: pog.Connection) -> ChildSpecification(Nil) {
  supervision.worker(fn() {
    case migrate(db) {
      Ok(Nil) -> Ok(actor.Started(pid: process.spawn(fn() { Nil }), data: Nil))
      Error(message) -> Error(actor.InitFailed(message))
    }
  })
  |> supervision.restart(supervision.Temporary)
}

/// Applies every migration that has not run yet, in version order.
///
/// Each migration runs inside its own transaction together with the row that
/// records it, so a crash mid-migration can never leave the schema half-built
/// but marked as applied.
pub fn migrate(db: pog.Connection) -> Result(Nil, String) {
  use _ <- result.try(exec(
    db,
    "create table if not exists schema_migrations (
         version    int primary key,
         name       text not null,
         applied_at timestamptz not null default now()
       )",
  ))
  use applied <- result.try(applied_versions(db))

  migrations.all()
  |> list.sort(fn(a, b) { int.compare(a.version, b.version) })
  |> list.filter(fn(migration) { !list.contains(applied, migration.version) })
  |> list.try_each(fn(migration) { apply(db, migration) })
}

fn applied_versions(db: pog.Connection) -> Result(List(Int), String) {
  pog.query("select version from schema_migrations")
  |> pog.returning({
    use version <- decode.field(0, decode.int)
    decode.success(version)
  })
  |> pog.execute(db)
  |> result.map(fn(returned) { returned.rows })
  |> result.map_error(describe("reading schema_migrations"))
}

fn apply(db: pog.Connection, migration: Migration) -> Result(Nil, String) {
  let label =
    "migration "
    <> int.to_string(migration.version)
    <> " ("
    <> migration.name
    <> ")"

  pog.transaction(db, fn(tx) {
    use _ <- result.try(
      list.try_each(migration.statements, fn(statement) { exec(tx, statement) }),
    )
    pog.query("insert into schema_migrations (version, name) values ($1, $2)")
    |> pog.parameter(pog.int(migration.version))
    |> pog.parameter(pog.text(migration.name))
    |> pog.execute(tx)
    |> result.replace(Nil)
    |> result.map_error(describe(label))
  })
  |> result.map_error(fn(error) {
    case error {
      pog.TransactionRolledBack(reason) -> reason
      pog.TransactionQueryError(query_error) -> describe(label)(query_error)
    }
  })
}

fn exec(db: pog.Connection, sql: String) -> Result(Nil, String) {
  pog.query(sql)
  |> pog.execute(db)
  |> result.replace(Nil)
  |> result.map_error(describe(first_line(sql)))
}

fn describe(context: String) -> fn(pog.QueryError) -> String {
  fn(error) { context <> ": " <> string.inspect(error) }
}

/// Query errors quote the statement that failed; the first line is enough to
/// identify it without dumping a whole `create table` into the logs.
fn first_line(sql: String) -> String {
  sql
  |> string.trim
  |> string.split("\n")
  |> list.first
  |> result.unwrap(sql)
}

/// A uuid as a query parameter. The ids are typed everywhere above this
/// layer; the column casts (`$1::uuid`) take the text form.
pub fn uuid(id: Uuid) -> pog.Value {
  pog.text(uuid.to_string(id))
}

/// A uuid column read back as text (`id::text`).
pub fn uuid_decoder() -> decode.Decoder(Uuid) {
  use text <- decode.then(decode.string)
  case uuid.from_string(text) {
    Ok(id) -> decode.success(id)
    // The placeholder is never seen: a failed decode is an error.
    Error(Nil) -> decode.failure(uuid.dns_uuid(), "Uuid")
  }
}
