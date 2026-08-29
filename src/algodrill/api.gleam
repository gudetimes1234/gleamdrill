//// The backend client.
////
//// Every call returns a Lustre effect that dispatches one message. Nothing
//// here touches the model; `algodrill.gleam` decides what a result means.
////
//// Card scheduling is deliberately one-directional: the server tells us where
//// a card stands, and we never send it a due date. The one thing computed
//// locally is `fsrs.preview`, for the "3d / 8d / 15d" hints on the grading
//// buttons -- and that runs the same scheduler module the server schedules
//// with, so the hint and the outcome cannot disagree.

import algodrill/problem.{type ProblemRef, ProblemRef}
import fsrs
import gleam/dynamic/decode.{type Decoder}
import gleam/http
import gleam/http/request.{type Request}
import gleam/http/response.{type Response}
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import lustre/effect.{type Effect}
import rsvp

// --- types -----------------------------------------------------------------

pub type User {
  User(id: String, email: String)
}

pub type Session {
  Session(token: String, user: User)
}

pub type CardState {
  CardState(
    problem: ProblemRef,
    card: fsrs.Card,
    reps: Int,
    lapses: Int,
    suspended: Bool,
    /// When the card was first seen. Guest mode counts new cards against the
    /// daily budget with this, the way the server does in SQL.
    introduced_at: Option(Timestamp),
  )
}

/// Where the user stands against today's limits.
///
/// `new_remaining` is a budget rather than a list: the server cannot enumerate
/// unseen problems because the catalogue lives in this bundle, not in the
/// database. Choosing which new problems to spend it on is our job.
pub type Today {
  Today(
    day_start: Timestamp,
    day_end: Timestamp,
    reviews_done: Int,
    new_introduced: Int,
    reviews_remaining: Int,
    new_remaining: Int,
    due_now: Int,
  )
}

pub type Settings {
  Settings(
    scheduler: fsrs.Config,
    new_per_day: Int,
    reviews_per_day: Int,
    day_start_hour: Int,
    timezone: String,
  )
}

/// Everything needed to start, from one request.
pub type BootState {
  BootState(
    /// The server's clock. Used in place of the device's, so that due
    /// comparisons in the UI agree with the scheduling that produced them.
    now: Timestamp,
    user: User,
    settings: Settings,
    cards: List(CardState),
    drafts: List(#(ProblemRef, String)),
    today: Today,
  )
}

pub type ReviewOutcome {
  ReviewOutcome(now: Timestamp, card: CardState, today: Today)
}

pub type DayTally {
  DayTally(days_ago: Int, total: Int, correct: Int)
}

pub type Stats {
  Stats(
    total_reviews: Int,
    mature_reviews: Int,
    mature_correct: Int,
    state_counts: List(#(Int, Int)),
    history: List(DayTally),
    forecast: List(#(Int, Int)),
    streak_days: Int,
  )
}

/// One solution written from memory: passed, nothing revealed, timed.
pub type CleanSolve {
  CleanSolve(problem: ProblemRef, at: Timestamp, duration_ms: Int)
}

/// For each grade pressed, what happened at that card's next review.
pub type Calibration {
  Calibration(rating: fsrs.Rating, total: Int, passed: Int)
}

pub type Insights {
  Insights(
    clean_solves: List(CleanSolve),
    reveals: List(#(ProblemRef, Int)),
    calibration: List(Calibration),
  )
}

/// One row of a card's review log, for the per-problem timeline.
pub type ReviewRow {
  ReviewRow(
    at: Timestamp,
    rating: fsrs.Rating,
    duration_ms: Option(Int),
    revealed: Bool,
    auto_failed: Bool,
    state_before: Int,
    scheduled_days: Int,
    stability_after: Option(Float),
  )
}

pub type Review {
  Review(
    problem: ProblemRef,
    rating: fsrs.Rating,
    duration_ms: Option(Int),
    auto_failed: Bool,
    revealed: Bool,
  )
}

/// What the app assumes before the first `/api/state` lands. Matching the
/// server's own defaults keeps the UI from flickering between two sets of
/// numbers on boot.
pub fn default_settings() -> Settings {
  Settings(
    scheduler: fsrs.default_config(),
    new_per_day: 10,
    reviews_per_day: 100,
    day_start_hour: 4,
    timezone: "UTC",
  )
}

pub fn empty_today() -> Today {
  let epoch = fsrs.from_epoch(0.0)
  Today(
    day_start: epoch,
    day_end: epoch,
    reviews_done: 0,
    new_introduced: 0,
    reviews_remaining: 0,
    new_remaining: 0,
    due_now: 0,
  )
}

pub type ApiError {
  /// No session, or it expired. The only error the app reacts to structurally:
  /// it means sign in again.
  Unauthorised
  /// The request was refused for a reason worth showing verbatim -- a taken
  /// email, a password that is too short, too many attempts.
  Rejected(message: String)
  /// The request never reached the server.
  Offline
  ServerFault(message: String)
}

pub fn error_message(error: ApiError) -> String {
  case error {
    Unauthorised -> "Your session has expired. Sign in again."
    Rejected(message) -> message
    Offline -> "Can't reach the server. Check your connection."
    ServerFault(message) -> message
  }
}

// --- requests --------------------------------------------------------------

pub fn signup(
  base: String,
  email: String,
  password: String,
  timezone: String,
  handler: fn(Result(Session, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Post,
    "/api/auth/signup",
    None,
    Some(
      json.object([
        #("email", json.string(email)),
        #("password", json.string(password)),
        #("timezone", json.string(timezone)),
      ]),
    ),
    session_decoder(),
    handler,
  )
}

/// The browser's IANA zone. Without it the account's study day would roll
/// over at 04:00 UTC wherever the user actually is.
pub fn login(
  base: String,
  email: String,
  password: String,
  handler: fn(Result(Session, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Post,
    "/api/auth/login",
    None,
    Some(credentials_json(email, password)),
    session_decoder(),
    handler,
  )
}

/// Logging out is best-effort by design: the client drops its token either
/// way, so a failure here would only leave a row to expire on its own.
pub fn logout(
  base: String,
  token: String,
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  send_expecting_nothing(
    base,
    http.Post,
    "/api/auth/logout",
    Some(token),
    None,
    handler,
  )
}

pub fn fetch_state(
  base: String,
  token: String,
  handler: fn(Result(BootState, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/state",
    Some(token),
    None,
    boot_state_decoder(),
    handler,
  )
}

pub fn post_review(
  base: String,
  token: String,
  review: Review,
  handler: fn(Result(ReviewOutcome, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Post,
    "/api/reviews",
    Some(token),
    Some(review_json(review)),
    review_outcome_decoder(),
    handler,
  )
}

pub fn put_draft(
  base: String,
  token: String,
  problem: ProblemRef,
  body: String,
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  send_expecting_nothing(
    base,
    http.Put,
    "/api/drafts",
    Some(token),
    Some(json.object(
      ref_fields(problem) |> list.append([#("body", json.string(body))]),
    )),
    handler,
  )
}

pub fn put_settings(
  base: String,
  token: String,
  settings: Settings,
  handler: fn(Result(Settings, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Put,
    "/api/settings",
    Some(token),
    Some(settings_json(settings)),
    decode.at(["settings"], settings_decoder()),
    handler,
  )
}

/// Hands the pre-account localStorage state to the server, once.
///
/// Solved problems are seeded as cards rather than replayed as reviews: the
/// old format stored a sticky boolean and no dates at all, so inventing a
/// review history from it would poison the data the FSRS optimizer will later
/// learn from.
pub fn import_legacy(
  base: String,
  token: String,
  solved: List(ProblemRef),
  cards: List(CardState),
  drafts: List(#(ProblemRef, String)),
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  send_expecting_nothing(
    base,
    http.Post,
    "/api/import",
    Some(token),
    Some(
      json.object([
        #(
          "solved",
          json.array(solved, fn(problem) { json.object(ref_fields(problem)) }),
        ),
        #("cards", json.array(cards, card_json)),
        #(
          "drafts",
          json.array(drafts, fn(entry) {
            json.object(
              ref_fields(entry.0)
              |> list.append([#("body", json.string(entry.1))]),
            )
          }),
        ),
      ]),
    ),
    handler,
  )
}

pub fn fetch_insights(
  base: String,
  token: String,
  handler: fn(Result(Insights, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/insights",
    Some(token),
    None,
    insights_decoder(),
    handler,
  )
}

pub fn fetch_history(
  base: String,
  token: String,
  problem: ProblemRef,
  handler: fn(Result(List(ReviewRow), ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/history?category="
      <> uri_encode(problem.category)
      <> "&subcategory="
      <> uri_encode(problem.subcategory)
      <> "&title="
      <> uri_encode(problem.title),
    Some(token),
    None,
    decode.at(["reviews"], decode.list(review_row_decoder())),
    handler,
  )
}

@external(javascript, "./ffi.mjs", "uriEncode")
fn uri_encode(value: String) -> String

pub fn fetch_stats(
  base: String,
  token: String,
  handler: fn(Result(Stats, ApiError)) -> message,
) -> Effect(message) {
  send(
    base,
    http.Get,
    "/api/stats",
    Some(token),
    None,
    stats_decoder(),
    handler,
  )
}

// --- plumbing --------------------------------------------------------------

fn send(
  base: String,
  method: http.Method,
  path: String,
  token: Option(String),
  body: Option(Json),
  decoder: Decoder(value),
  handler: fn(Result(value, ApiError)) -> message,
) -> Effect(message) {
  case build(base, method, path, token, body) {
    Error(Nil) -> dispatch_error(handler, unreachable_base(base))
    Ok(request) ->
      rsvp.send(
        request,
        rsvp.expect_json(decoder, fn(result) {
          handler(result.map_error(result, translate))
        }),
      )
  }
}

/// For endpoints answering 204: there is no body to decode, and asking
/// `expect_json` for one would turn success into `UnhandledResponse`.
fn send_expecting_nothing(
  base: String,
  method: http.Method,
  path: String,
  token: Option(String),
  body: Option(Json),
  handler: fn(Result(Nil, ApiError)) -> message,
) -> Effect(message) {
  case build(base, method, path, token, body) {
    Error(Nil) -> dispatch_error(handler, unreachable_base(base))
    Ok(request) ->
      rsvp.send(
        request,
        rsvp.expect_ok_response(fn(result) {
          handler(
            result
            |> result.replace(Nil)
            |> result.map_error(translate),
          )
        }),
      )
  }
}

fn build(
  base: String,
  method: http.Method,
  path: String,
  token: Option(String),
  body: Option(Json),
) -> Result(Request(String), Nil) {
  use request <- result.try(request.to(base <> path))
  let request = request.set_method(request, method)

  let request = case token {
    Some(token) ->
      request.set_header(request, "authorization", "Bearer " <> token)
    None -> request
  }

  Ok(case body {
    None -> request
    Some(body) ->
      request
      |> request.set_header("content-type", "application/json")
      |> request.set_body(json.to_string(body))
  })
}

fn unreachable_base(base: String) -> ApiError {
  case base {
    "" -> ServerFault("No backend is configured for this deployment.")
    _ -> ServerFault("The backend address is not a valid URL: " <> base)
  }
}

/// A failure that never left the browser still has to arrive as a message, or
/// the UI would sit on a spinner forever.
fn dispatch_error(
  handler: fn(Result(value, ApiError)) -> message,
  error: ApiError,
) -> Effect(message) {
  use dispatch <- effect.from
  dispatch(handler(Error(error)))
}

fn translate(error: rsvp.Error(String)) -> ApiError {
  case error {
    rsvp.NetworkError -> Offline
    rsvp.BadUrl(url) -> ServerFault("Bad request URL: " <> url)
    rsvp.BadBody -> ServerFault("The server sent a malformed response.")
    rsvp.JsonError(_) ->
      ServerFault("The server sent something this version can't read.")
    rsvp.UnhandledResponse(response) ->
      ServerFault(
        "Unexpected response from the server ("
        <> int.to_string(response.status)
        <> ").",
      )
    rsvp.HttpError(response) -> from_response(response)
  }
}

fn from_response(response: Response(String)) -> ApiError {
  let message =
    json.parse(response.body, decode.at(["message"], decode.string))
    |> result.unwrap("The server rejected that request.")
  let code =
    json.parse(response.body, decode.at(["error"], decode.string))
    |> result.unwrap("")

  case response.status, code {
    // Not every 401 means "your session ended". A failed sign-in is also a
    // 401, and answering it with "your session has expired" is nonsense to
    // someone who never had one -- and worse, `Unauthorised` is the signal
    // that drops the app back to guest and clears the stored token.
    401, "session_expired" | 401, "not_authenticated" -> Unauthorised
    401, _ -> Rejected(message)
    // 409 taken, 422 invalid, 429 throttled: all worth showing as written,
    // since the server phrases them for a human.
    _, _ ->
      case response.status {
        409 | 422 | 429 -> Rejected(message)
        _ -> ServerFault(message)
      }
  }
}

// --- encoding --------------------------------------------------------------

fn credentials_json(email: String, password: String) -> Json {
  json.object([
    #("email", json.string(email)),
    #("password", json.string(password)),
  ])
}

fn ref_fields(problem: ProblemRef) -> List(#(String, Json)) {
  [
    #("category", json.string(problem.category)),
    #("subcategory", json.string(problem.subcategory)),
    #("title", json.string(problem.title)),
  ]
}

fn review_json(review: Review) -> Json {
  json.object(
    ref_fields(review.problem)
    |> list.append([
      #("rating", json.int(fsrs.rating_to_int(review.rating))),
      #("durationMs", case review.duration_ms {
        Some(value) -> json.int(value)
        None -> json.null()
      }),
      #("autoFailed", json.bool(review.auto_failed)),
      #("revealed", json.bool(review.revealed)),
    ]),
  )
}

pub fn settings_json(settings: Settings) -> Json {
  let scheduler = settings.scheduler
  json.object([
    #("parameters", json.array(scheduler.parameters, json.float)),
    #("desiredRetention", json.float(scheduler.desired_retention)),
    #("learningSteps", json.array(scheduler.learning_steps, json.int)),
    #("relearningSteps", json.array(scheduler.relearning_steps, json.int)),
    #("maximumInterval", json.int(scheduler.maximum_interval)),
    #("enableFuzz", json.bool(scheduler.enable_fuzz)),
    #("newPerDay", json.int(settings.new_per_day)),
    #("reviewsPerDay", json.int(settings.reviews_per_day)),
    #("dayStartHour", json.int(settings.day_start_hour)),
    #("timezone", json.string(settings.timezone)),
  ])
}

// --- decoding --------------------------------------------------------------

fn user_decoder() -> Decoder(User) {
  use id <- decode.field("id", decode.string)
  use email <- decode.field("email", decode.string)
  decode.success(User(id:, email:))
}

pub fn session_decoder() -> Decoder(Session) {
  use token <- decode.field("token", decode.string)
  use user <- decode.field("user", user_decoder())
  decode.success(Session(token:, user:))
}

/// A JSON number, with or without a decimal point, as a timestamp.
///
/// The mirror of the server's `lenient_float`: whole floats and integers are
/// indistinguishable in JSON once a JavaScript encoder has been near them, and
/// epoch seconds land on whole numbers often enough to matter.
fn moment() -> Decoder(Timestamp) {
  lenient_float() |> decode.map(fsrs.from_epoch)
}

fn lenient_float() -> Decoder(Float) {
  decode.one_of(decode.float, [decode.int |> decode.map(int.to_float)])
}

fn ref_decoder() -> Decoder(ProblemRef) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  decode.success(ProblemRef(category:, subcategory:, title:))
}

pub fn card_decoder() -> Decoder(CardState) {
  use problem <- decode.then(ref_decoder())
  use state <- decode.field("state", decode.int)
  use step <- decode.field("step", decode.optional(decode.int))
  use stability <- decode.field("stability", decode.optional(lenient_float()))
  use difficulty <- decode.field("difficulty", decode.optional(lenient_float()))
  use due <- decode.field("due", moment())
  use last_review <- decode.field("lastReview", decode.optional(moment()))
  use reps <- decode.field("reps", decode.int)
  use lapses <- decode.field("lapses", decode.int)
  use suspended <- decode.field("suspended", decode.bool)
  use introduced_at <- decode.optional_field(
    "introducedAt",
    None,
    decode.optional(moment()),
  )

  decode.success(CardState(
    problem:,
    card: fsrs.Card(
      state: card_state(state, step),
      memory: case stability, difficulty {
        Some(stability), Some(difficulty) ->
          Some(fsrs.Memory(stability:, difficulty:))
        _, _ -> None
      },
      due:,
      last_review:,
    ),
    reps:,
    lapses:,
    suspended:,
    introduced_at:,
  ))
}

/// The wire format for a card, shared by three callers: guest-mode local
/// storage, the upgrade payload, and the contract test fixtures. One format
/// means `card_decoder` round-trips all three, so a change cannot break one
/// of them silently.
pub fn card_json(state: CardState) -> Json {
  let card = state.card
  json.object(
    ref_fields(state.problem)
    |> list.append([
      #("state", json.int(state_code(card.state))),
      #("step", nullable_int(state_step(card.state))),
      #(
        "stability",
        nullable_float(option.map(card.memory, fn(m) { m.stability })),
      ),
      #(
        "difficulty",
        nullable_float(option.map(card.memory, fn(m) { m.difficulty })),
      ),
      #("due", json.float(fsrs.to_epoch(card.due))),
      #("lastReview", nullable_epoch(card.last_review)),
      #("reps", json.int(state.reps)),
      #("lapses", json.int(state.lapses)),
      #("suspended", json.bool(state.suspended)),
      #("introducedAt", nullable_epoch(state.introduced_at)),
    ]),
  )
}

pub fn state_code(state: fsrs.State) -> Int {
  case state {
    fsrs.Learning(_) -> 1
    fsrs.Review -> 2
    fsrs.Relearning(_) -> 3
  }
}

pub fn state_step(state: fsrs.State) -> Option(Int) {
  case state {
    fsrs.Learning(step) | fsrs.Relearning(step) -> Some(step)
    fsrs.Review -> None
  }
}

fn nullable_int(value: Option(Int)) -> Json {
  case value {
    Some(value) -> json.int(value)
    None -> json.null()
  }
}

fn nullable_float(value: Option(Float)) -> Json {
  case value {
    Some(value) -> json.float(value)
    None -> json.null()
  }
}

fn nullable_epoch(value: Option(Timestamp)) -> Json {
  case value {
    Some(moment) -> json.float(fsrs.to_epoch(moment))
    None -> json.null()
  }
}

fn card_state(code: Int, step: Option(Int)) -> fsrs.State {
  case code, step {
    2, _ -> fsrs.Review
    3, Some(step) -> fsrs.Relearning(step)
    3, None -> fsrs.Relearning(0)
    _, Some(step) -> fsrs.Learning(step)
    _, None -> fsrs.Learning(0)
  }
}

pub fn today_decoder() -> Decoder(Today) {
  use day_start <- decode.field("dayStart", moment())
  use day_end <- decode.field("dayEnd", moment())
  use reviews_done <- decode.field("reviewsDone", decode.int)
  use new_introduced <- decode.field("newIntroduced", decode.int)
  use reviews_remaining <- decode.field("reviewsRemaining", decode.int)
  use new_remaining <- decode.field("newRemaining", decode.int)
  use due_now <- decode.field("dueNow", decode.int)
  decode.success(Today(
    day_start:,
    day_end:,
    reviews_done:,
    new_introduced:,
    reviews_remaining:,
    new_remaining:,
    due_now:,
  ))
}

pub fn settings_decoder() -> Decoder(Settings) {
  use parameters <- decode.field("parameters", decode.list(lenient_float()))
  use desired_retention <- decode.field("desiredRetention", lenient_float())
  use learning_steps <- decode.field("learningSteps", decode.list(decode.int))
  use relearning_steps <- decode.field(
    "relearningSteps",
    decode.list(decode.int),
  )
  use maximum_interval <- decode.field("maximumInterval", decode.int)
  use enable_fuzz <- decode.field("enableFuzz", decode.bool)
  use new_per_day <- decode.field("newPerDay", decode.int)
  use reviews_per_day <- decode.field("reviewsPerDay", decode.int)
  use day_start_hour <- decode.field("dayStartHour", decode.int)
  use timezone <- decode.field("timezone", decode.string)
  decode.success(Settings(
    scheduler: fsrs.Config(
      parameters:,
      desired_retention:,
      learning_steps:,
      relearning_steps:,
      maximum_interval:,
      enable_fuzz:,
    ),
    new_per_day:,
    reviews_per_day:,
    day_start_hour:,
    timezone:,
  ))
}

fn draft_decoder() -> Decoder(#(ProblemRef, String)) {
  use problem <- decode.then(ref_decoder())
  use body <- decode.field("body", decode.string)
  decode.success(#(problem, body))
}

pub fn boot_state_decoder() -> Decoder(BootState) {
  use now <- decode.field("now", moment())
  use user <- decode.field("user", user_decoder())
  use settings <- decode.field("settings", settings_decoder())
  use cards <- decode.field("cards", decode.list(card_decoder()))
  use drafts <- decode.field("drafts", decode.list(draft_decoder()))
  use today <- decode.field("today", today_decoder())
  decode.success(BootState(now:, user:, settings:, cards:, drafts:, today:))
}

pub fn review_outcome_decoder() -> Decoder(ReviewOutcome) {
  use now <- decode.field("now", moment())
  use card <- decode.field("card", card_decoder())
  use today <- decode.field("today", today_decoder())
  decode.success(ReviewOutcome(now:, card:, today:))
}

pub fn insights_decoder() -> Decoder(Insights) {
  use clean_solves <- decode.field(
    "cleanSolves",
    decode.list({
      use problem <- decode.then(ref_decoder())
      use at <- decode.field("at", moment())
      use duration_ms <- decode.field("durationMs", decode.int)
      decode.success(CleanSolve(problem:, at:, duration_ms:))
    }),
  )
  use reveals <- decode.field(
    "reveals",
    decode.list({
      use problem <- decode.then(ref_decoder())
      use count <- decode.field("count", decode.int)
      decode.success(#(problem, count))
    }),
  )
  use calibration <- decode.field(
    "calibration",
    decode.list({
      use rating <- decode.field("rating", rating_field())
      use total <- decode.field("total", decode.int)
      use passed <- decode.field("passed", decode.int)
      decode.success(Calibration(rating:, total:, passed:))
    }),
  )
  decode.success(Insights(clean_solves:, reveals:, calibration:))
}

pub fn review_row_decoder() -> Decoder(ReviewRow) {
  use at <- decode.field("at", moment())
  use rating <- decode.field("rating", rating_field())
  use duration_ms <- decode.field("durationMs", decode.optional(decode.int))
  use revealed <- decode.field("revealed", decode.bool)
  use auto_failed <- decode.field("autoFailed", decode.bool)
  use state_before <- decode.field("stateBefore", decode.int)
  use scheduled_days <- decode.field("scheduledDays", decode.int)
  use stability_after <- decode.field(
    "stabilityAfter",
    decode.optional(lenient_float()),
  )
  decode.success(ReviewRow(
    at:,
    rating:,
    duration_ms:,
    revealed:,
    auto_failed:,
    state_before:,
    scheduled_days:,
    stability_after:,
  ))
}

fn rating_field() -> Decoder(fsrs.Rating) {
  use value <- decode.then(decode.int)
  case fsrs.rating_from_int(value) {
    Ok(rating) -> decode.success(rating)
    Error(Nil) -> decode.failure(fsrs.Good, "Rating")
  }
}

pub fn stats_decoder() -> Decoder(Stats) {
  use total_reviews <- decode.field("totalReviews", decode.int)
  use mature_reviews <- decode.field("matureReviews", decode.int)
  use mature_correct <- decode.field("matureCorrect", decode.int)
  use streak_days <- decode.field("streakDays", decode.int)
  use state_counts <- decode.field(
    "stateCounts",
    decode.list({
      use state <- decode.field("state", decode.int)
      use count <- decode.field("count", decode.int)
      decode.success(#(state, count))
    }),
  )
  use history <- decode.field(
    "history",
    decode.list({
      use days_ago <- decode.field("daysAgo", decode.int)
      use total <- decode.field("total", decode.int)
      use correct <- decode.field("correct", decode.int)
      decode.success(DayTally(days_ago:, total:, correct:))
    }),
  )
  use forecast <- decode.field(
    "forecast",
    decode.list({
      use days_ahead <- decode.field("daysAhead", decode.int)
      use count <- decode.field("count", decode.int)
      decode.success(#(days_ahead, count))
    }),
  )
  decode.success(Stats(
    total_reviews:,
    mature_reviews:,
    mature_correct:,
    state_counts:,
    history:,
    forecast:,
    streak_days:,
  ))
}
