//// HTTP routing.

import gleam/json
import server/routes/accounts
import server/routes/study
import server/web.{type Context}
import wisp

pub fn handle(request: wisp.Request, context: Context) -> wisp.Response {
  use request <- web.middleware(request, context)

  case wisp.path_segments(request) {
    ["health"] -> health()

    ["api", "auth", "signup"] -> accounts.signup(request, context)
    ["api", "auth", "login"] -> accounts.login(request, context)
    ["api", "auth", "logout"] -> accounts.logout(request, context)
    ["api", "me"] -> accounts.me(request, context)

    ["api", "state"] -> study.state(request, context)
    ["api", "cards"] -> study.suspend(request, context)
    ["api", "reviews"] -> study.review(request, context)
    ["api", "drafts"] -> study.draft(request, context)
    ["api", "settings"] -> study.settings(request, context)
    ["api", "stats"] -> study.stats(request, context)
    ["api", "insights"] -> study.insights(request, context)
    ["api", "history"] -> study.history(request, context)
    ["api", "import"] -> study.import_legacy(request, context)

    _ -> web.error(404, "not_found", "No such endpoint.")
  }
}

/// Deliberately does not touch the database: this answers "is the process up",
/// which a platform health check needs to distinguish from "the database is
/// briefly unreachable" -- the latter should not trigger a redeploy loop.
fn health() -> wisp.Response {
  json.object([#("status", json.string("ok"))])
  |> json.to_string
  |> wisp.json_response(200)
}
