//// Every payload that crosses between the browser app and the backend, with
//// exactly one encoder and one decoder each.
////
//// These shapes used to exist twice: once as encoders in
//// `server/src/server/routes/study.gleam` and once as decoders in
//// `src/gleamdrill/api.gleam`, roughly six hundred hand-written lines with
//// several bodies byte-identical between them. Nothing checked that they
//// agreed except captured fixtures, and only if somebody remembered to
//// recapture them. They had already drifted -- the server sent `rating` as an
//// `Int` while the client modelled it as an `fsrs.Rating`, and `reveals` was a
//// record on one side and a tuple on the other.
////
//// This package is compiled to both targets from one source, so a field
//// renamed here is a compile error on whichever side has not caught up.
////
//// Two things deliberately stay out. Transport is one: `rsvp`, `ApiError` and
//// wisp responses are each side's own business. Storage is the other: the
//// server's `CardRecord` carries a database id that never crosses the wire,
//// and its `pog` row decoders answer to the schema, not to this.

import fsrs
import gleam/dynamic/decode.{type Decoder}
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/time/timestamp.{type Timestamp}

// --- types -----------------------------------------------------------------

/// Identifies one drill in the catalogue.
///
/// `category` already encodes the language ("NeetCode 150 · Python"), so this
/// is the whole key: it is what localStorage, the server's `cards` table and
/// the scheduler all agree on.
pub type ProblemRef {
  ProblemRef(category: String, subcategory: String, title: String)
}

pub type User {
  User(id: String, email: String)
}

pub type Session {
  Session(token: String, user: User)
}

/// A card as it crosses the wire. The server's `CardRecord` is this plus a
/// database id, which is why that type stays where it is.
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
/// unseen problems because the catalogue lives in the app bundle, not in the
/// database. Choosing which new problems to spend it on is the client's job.
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
    /// The user's own note on each problem -- what to remember next time.
    /// Same shape as a draft: a body keyed by the problem.
    notes: List(#(ProblemRef, String)),
    today: Today,
  )
}

pub type ReviewOutcome {
  ReviewOutcome(now: Timestamp, card: CardState, today: Today)
}

/// What changed after adding problems to the study queue, or taking them out.
///
/// One shape for both directions so there is one decoder and one message to
/// fold: `cards` is the state of every problem the request named that now has
/// a card, and `removed` the ones whose card is gone. A request that asks to
/// remove a problem which has already been studied gets it back in neither
/// list -- deleting it would cascade its review log away -- and the server
/// says so in `refused`, which the client turns into a suspension instead.
pub type QueueChange {
  QueueChange(
    now: Timestamp,
    cards: List(CardState),
    removed: List(ProblemRef),
    refused: List(ProblemRef),
    today: Today,
  )
}

pub type DayTally {
  DayTally(days_ago: Int, total: Int, correct: Int)
}

pub type Stats {
  Stats(
    total_reviews: Int,
    /// Reviews of cards that had already graduated -- Anki's "true retention".
    mature_reviews: Int,
    mature_correct: Int,
    /// Card counts keyed by state code.
    state_counts: List(#(Int, Int)),
    history: List(DayTally),
    /// #(days from today, cards due that day).
    forecast: List(#(Int, Int)),
    streak_days: Int,
  )
}

/// One solution written from memory: passed, nothing revealed, timed.
pub type CleanSolve {
  CleanSolve(problem: ProblemRef, at: Timestamp, duration_ms: Int)
}

/// For each grade pressed, what happened at that card's next review.
///
/// `rating` is an `fsrs.Rating` rather than the `Int` the server used to send,
/// so an out-of-range code fails at the boundary instead of somewhere later.
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
    /// A recall-only review: the approach and solution were shown and the
    /// grade was given from memory, with no code written. Scheduled like
    /// any review, but never counted as a solve.
    recall: Bool,
  )
}

/// A review as the client submits it. The server decides the resulting
/// schedule; nothing here proposes a due date.
pub type Review {
  Review(
    problem: ProblemRef,
    rating: fsrs.Rating,
    duration_ms: Option(Int),
    auto_failed: Bool,
    revealed: Bool,
    /// True for a hand-picked (non-study-queue) sitting: practice grades
    /// freely, so the server must not coerce the rating. The log still
    /// records auto_failed/revealed truthfully.
    practice: Bool,
    /// See `ReviewRow.recall`.
    recall: Bool,
  )
}

// --- defaults --------------------------------------------------------------

/// What the app assumes before the first `/api/state` lands, and what a new
/// account is created with. One definition, so the UI cannot flicker between
/// two sets of numbers on boot.
pub fn default_settings() -> Settings {
  Settings(
    scheduler: fsrs.default_config(),
    // Low on purpose. A card here is a problem typed from memory, minutes not
    // seconds, so a flashcard-sized default is a daily workload nobody clears
    // -- and a limit that never binds is a decoration. The settings screen is
    // where someone who wants more says so.
    new_per_day: 5,
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

// --- card state codes ------------------------------------------------------
//
// How a card's phase is persisted, in the database and on the wire alike.

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

/// The inverse. Total on purpose: an unrecognised code reads as `Learning`,
/// because a card whose phase we cannot parse is one to show again, not one to
/// crash on.
pub fn state_from(code: Int, step: Option(Int)) -> fsrs.State {
  case code, step {
    2, _ -> fsrs.Review
    3, Some(step) -> fsrs.Relearning(step)
    3, None -> fsrs.Relearning(0)
    _, Some(step) -> fsrs.Learning(step)
    _, None -> fsrs.Learning(0)
  }
}

// --- encoding --------------------------------------------------------------

pub fn ref_fields(problem: ProblemRef) -> List(#(String, Json)) {
  [
    #("category", json.string(problem.category)),
    #("subcategory", json.string(problem.subcategory)),
    #("title", json.string(problem.title)),
  ]
}

pub fn ref_to_json(problem: ProblemRef) -> Json {
  json.object(ref_fields(problem))
}

pub fn user_to_json(user: User) -> Json {
  json.object([
    #("id", json.string(user.id)),
    #("email", json.string(user.email)),
  ])
}

pub fn session_to_json(session: Session) -> Json {
  json.object([
    #("token", json.string(session.token)),
    #("user", user_to_json(session.user)),
  ])
}

/// The wire format for a card, shared by four callers: the server's responses,
/// guest-mode local storage, the upgrade payload, and the contract fixtures.
/// One format means `card_decoder` round-trips all four.
pub fn card_to_json(state: CardState) -> Json {
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

pub fn draft_to_json(entry: #(ProblemRef, String)) -> Json {
  let #(problem, body) = entry
  json.object(
    ref_fields(problem) |> list.append([#("body", json.string(body))]),
  )
}

pub fn today_to_json(today: Today) -> Json {
  json.object([
    #("dayStart", json.float(fsrs.to_epoch(today.day_start))),
    #("dayEnd", json.float(fsrs.to_epoch(today.day_end))),
    #("reviewsDone", json.int(today.reviews_done)),
    #("newIntroduced", json.int(today.new_introduced)),
    #("reviewsRemaining", json.int(today.reviews_remaining)),
    #("newRemaining", json.int(today.new_remaining)),
    #("dueNow", json.int(today.due_now)),
  ])
}

pub fn settings_to_json(settings: Settings) -> Json {
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

pub fn boot_state_to_json(state: BootState) -> Json {
  json.object([
    #("now", json.float(fsrs.to_epoch(state.now))),
    #("user", user_to_json(state.user)),
    #("settings", settings_to_json(state.settings)),
    #("cards", json.array(state.cards, card_to_json)),
    #("drafts", json.array(state.drafts, draft_to_json)),
    #("notes", json.array(state.notes, draft_to_json)),
    #("today", today_to_json(state.today)),
  ])
}

pub fn review_outcome_to_json(outcome: ReviewOutcome) -> Json {
  json.object([
    #("now", json.float(fsrs.to_epoch(outcome.now))),
    #("card", card_to_json(outcome.card)),
    #("today", today_to_json(outcome.today)),
  ])
}

pub fn queue_change_to_json(change: QueueChange) -> Json {
  json.object([
    #("now", json.float(fsrs.to_epoch(change.now))),
    #("cards", json.array(change.cards, card_to_json)),
    #("removed", json.array(change.removed, ref_to_json)),
    #("refused", json.array(change.refused, ref_to_json)),
    #("today", today_to_json(change.today)),
  ])
}

pub fn stats_to_json(stats: Stats) -> Json {
  json.object([
    #("totalReviews", json.int(stats.total_reviews)),
    #("matureReviews", json.int(stats.mature_reviews)),
    #("matureCorrect", json.int(stats.mature_correct)),
    #("streakDays", json.int(stats.streak_days)),
    #(
      "stateCounts",
      json.array(stats.state_counts, fn(entry) {
        json.object([
          #("state", json.int(entry.0)),
          #("count", json.int(entry.1)),
        ])
      }),
    ),
    #(
      "history",
      json.array(stats.history, fn(day) {
        json.object([
          #("daysAgo", json.int(day.days_ago)),
          #("total", json.int(day.total)),
          #("correct", json.int(day.correct)),
        ])
      }),
    ),
    #(
      "forecast",
      json.array(stats.forecast, fn(entry) {
        json.object([
          #("daysAhead", json.int(entry.0)),
          #("count", json.int(entry.1)),
        ])
      }),
    ),
  ])
}

pub fn insights_to_json(insights: Insights) -> Json {
  json.object([
    #(
      "cleanSolves",
      json.array(insights.clean_solves, fn(solve) {
        json.object(
          ref_fields(solve.problem)
          |> list.append([
            #("at", json.float(fsrs.to_epoch(solve.at))),
            #("durationMs", json.int(solve.duration_ms)),
          ]),
        )
      }),
    ),
    #(
      "reveals",
      json.array(insights.reveals, fn(reveal) {
        json.object(
          ref_fields(reveal.0)
          |> list.append([#("count", json.int(reveal.1))]),
        )
      }),
    ),
    #(
      "calibration",
      json.array(insights.calibration, fn(row) {
        json.object([
          #("rating", json.int(fsrs.rating_to_int(row.rating))),
          #("total", json.int(row.total)),
          #("passed", json.int(row.passed)),
        ])
      }),
    ),
  ])
}

pub fn review_row_to_json(row: ReviewRow) -> Json {
  json.object([
    #("at", json.float(fsrs.to_epoch(row.at))),
    #("rating", json.int(fsrs.rating_to_int(row.rating))),
    #("durationMs", nullable_int(row.duration_ms)),
    #("revealed", json.bool(row.revealed)),
    #("autoFailed", json.bool(row.auto_failed)),
    #("stateBefore", json.int(row.state_before)),
    #("scheduledDays", json.int(row.scheduled_days)),
    #("stabilityAfter", nullable_float(row.stability_after)),
    #("recall", json.bool(row.recall)),
  ])
}

pub fn review_to_json(review: Review) -> Json {
  json.object(
    ref_fields(review.problem)
    |> list.append([
      #("rating", json.int(fsrs.rating_to_int(review.rating))),
      #("durationMs", nullable_int(review.duration_ms)),
      #("autoFailed", json.bool(review.auto_failed)),
      #("revealed", json.bool(review.revealed)),
      #("practice", json.bool(review.practice)),
      #("recall", json.bool(review.recall)),
    ]),
  )
}

pub fn nullable_int(value: Option(Int)) -> Json {
  case value {
    Some(value) -> json.int(value)
    None -> json.null()
  }
}

pub fn nullable_float(value: Option(Float)) -> Json {
  case value {
    Some(value) -> json.float(value)
    None -> json.null()
  }
}

pub fn nullable_epoch(value: Option(Timestamp)) -> Json {
  case value {
    Some(moment) -> json.float(fsrs.to_epoch(moment))
    None -> json.null()
  }
}

// --- decoding --------------------------------------------------------------

/// A JSON number with or without a decimal point.
///
/// JavaScript's `JSON.stringify` renders a whole float as `1787788818` while
/// Erlang keeps `1787788818.0`, and epoch seconds land on whole numbers often
/// enough to matter. Both sides need this or one of them rejects the other's
/// perfectly good numbers; that bug has already been paid for once.
pub fn lenient_float() -> Decoder(Float) {
  decode.one_of(decode.float, [decode.int |> decode.map(int.to_float)])
}

/// Epoch seconds as a timestamp.
pub fn moment() -> Decoder(Timestamp) {
  lenient_float() |> decode.map(fsrs.from_epoch)
}

pub fn rating_decoder() -> Decoder(fsrs.Rating) {
  use value <- decode.then(decode.int)
  case fsrs.rating_from_int(value) {
    Ok(rating) -> decode.success(rating)
    Error(Nil) -> decode.failure(fsrs.Good, "Rating")
  }
}

pub fn ref_decoder() -> Decoder(ProblemRef) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  decode.success(ProblemRef(category:, subcategory:, title:))
}

pub fn user_decoder() -> Decoder(User) {
  use id <- decode.field("id", decode.string)
  use email <- decode.field("email", decode.string)
  decode.success(User(id:, email:))
}

pub fn session_decoder() -> Decoder(Session) {
  use token <- decode.field("token", decode.string)
  use user <- decode.field("user", user_decoder())
  decode.success(Session(token:, user:))
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
      state: state_from(state, step),
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

pub fn draft_decoder() -> Decoder(#(ProblemRef, String)) {
  use problem <- decode.then(ref_decoder())
  use body <- decode.field("body", decode.string)
  decode.success(#(problem, body))
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

pub fn boot_state_decoder() -> Decoder(BootState) {
  use now <- decode.field("now", moment())
  use user <- decode.field("user", user_decoder())
  use settings <- decode.field("settings", settings_decoder())
  use cards <- decode.field("cards", decode.list(card_decoder()))
  use drafts <- decode.field("drafts", decode.list(draft_decoder()))
  // Optional: a server from before notes existed sends none.
  use notes <- decode.optional_field("notes", [], decode.list(draft_decoder()))
  use today <- decode.field("today", today_decoder())
  decode.success(BootState(
    now:,
    user:,
    settings:,
    cards:,
    drafts:,
    notes:,
    today:,
  ))
}

pub fn review_outcome_decoder() -> Decoder(ReviewOutcome) {
  use now <- decode.field("now", moment())
  use card <- decode.field("card", card_decoder())
  use today <- decode.field("today", today_decoder())
  decode.success(ReviewOutcome(now:, card:, today:))
}

pub fn queue_change_decoder() -> Decoder(QueueChange) {
  use now <- decode.field("now", moment())
  use cards <- decode.field("cards", decode.list(card_decoder()))
  use removed <- decode.field("removed", decode.list(ref_decoder()))
  use refused <- decode.field("refused", decode.list(ref_decoder()))
  use today <- decode.field("today", today_decoder())
  decode.success(QueueChange(now:, cards:, removed:, refused:, today:))
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
      use rating <- decode.field("rating", rating_decoder())
      use total <- decode.field("total", decode.int)
      use passed <- decode.field("passed", decode.int)
      decode.success(Calibration(rating:, total:, passed:))
    }),
  )
  decode.success(Insights(clean_solves:, reveals:, calibration:))
}

pub fn review_row_decoder() -> Decoder(ReviewRow) {
  use at <- decode.field("at", moment())
  use rating <- decode.field("rating", rating_decoder())
  use duration_ms <- decode.field("durationMs", decode.optional(decode.int))
  use revealed <- decode.field("revealed", decode.bool)
  use auto_failed <- decode.field("autoFailed", decode.bool)
  use state_before <- decode.field("stateBefore", decode.int)
  use scheduled_days <- decode.field("scheduledDays", decode.int)
  use stability_after <- decode.field(
    "stabilityAfter",
    decode.optional(lenient_float()),
  )
  // Rows logged before recall mode existed have no flag: none of them were.
  use recall <- decode.optional_field("recall", False, decode.bool)
  decode.success(ReviewRow(
    at:,
    rating:,
    duration_ms:,
    revealed:,
    auto_failed:,
    state_before:,
    scheduled_days:,
    stability_after:,
    recall:,
  ))
}

/// The one payload that travels client to server, so this is the only decoder
/// the backend runs against untrusted input.
pub fn review_decoder() -> Decoder(Review) {
  use problem <- decode.then(ref_decoder())
  use rating <- decode.field("rating", rating_decoder())
  // Every optional field here is optional because a client that omits it
  // should be scheduled, not rejected: a stale tab still submitting reviews is
  // a worse thing to 422 than to default.
  use duration_ms <- decode.optional_field(
    "durationMs",
    None,
    decode.optional(decode.int),
  )
  use auto_failed <- decode.optional_field("autoFailed", False, decode.bool)
  use revealed <- decode.optional_field("revealed", False, decode.bool)
  use practice <- decode.optional_field("practice", False, decode.bool)
  use recall <- decode.optional_field("recall", False, decode.bool)
  decode.success(Review(
    problem:,
    rating:,
    duration_ms:,
    auto_failed:,
    revealed:,
    practice:,
    recall:,
  ))
}

// --- server-side runs -------------------------------------------------------

/// A request to run an attempt on the server. Only Elixir travels this way:
/// every other language compiles in the browser, and the server has no
/// business seeing that code. The harness is sent along with the solution
/// because the server holds no catalogue -- and it is as untrusted as the
/// solution anyway; the sandbox around the run is the boundary, not this.
pub type RunRequest {
  RunRequest(language: String, solution: String, harness: String)
}

/// One harness case: the label it prints under, the expected and actual
/// values rendered the same way, and whether they agreed.
pub type CaseResult {
  CaseResult(label: String, expected: String, actual: String, passed: Bool)
}

/// Why a run produced no cases. `phase` is "compile", "run" or "internal" --
/// the last for the runner's own failures, which are never the user's fault.
pub type RunError {
  RunError(phase: String, line: Option(Int), message: String)
}

/// What a server-side run reports back. Mirrors the shape the browser
/// workers post, so the app folds both into the same state.
pub type RunResult {
  RunResult(cases: List(CaseResult), stdout: String, error: Option(RunError))
}

pub fn run_request_to_json(request: RunRequest) -> Json {
  json.object([
    #("language", json.string(request.language)),
    #("solution", json.string(request.solution)),
    #("harness", json.string(request.harness)),
  ])
}

pub fn run_result_to_json(result: RunResult) -> Json {
  json.object([
    #("cases", json.array(result.cases, case_result_to_json)),
    #("stdout", json.string(result.stdout)),
    #("error", case result.error {
      Some(error) -> run_error_to_json(error)
      None -> json.null()
    }),
  ])
}

fn case_result_to_json(case_result: CaseResult) -> Json {
  json.object([
    #("label", json.string(case_result.label)),
    #("expected", json.string(case_result.expected)),
    #("actual", json.string(case_result.actual)),
    #("passed", json.bool(case_result.passed)),
  ])
}

fn run_error_to_json(error: RunError) -> Json {
  json.object([
    #("phase", json.string(error.phase)),
    #("line", nullable_int(error.line)),
    #("message", json.string(error.message)),
  ])
}

pub fn run_request_decoder() -> Decoder(RunRequest) {
  use language <- decode.field("language", decode.string)
  use solution <- decode.field("solution", decode.string)
  use harness <- decode.field("harness", decode.string)
  decode.success(RunRequest(language:, solution:, harness:))
}

pub fn run_result_decoder() -> Decoder(RunResult) {
  use cases <- decode.field("cases", decode.list(case_result_decoder()))
  use stdout <- decode.optional_field("stdout", "", decode.string)
  use error <- decode.optional_field(
    "error",
    None,
    decode.optional(run_error_decoder()),
  )
  decode.success(RunResult(cases:, stdout:, error:))
}

pub fn case_result_decoder() -> Decoder(CaseResult) {
  use label <- decode.field("label", decode.string)
  use expected <- decode.field("expected", decode.string)
  use actual <- decode.field("actual", decode.string)
  use passed <- decode.field("passed", decode.bool)
  decode.success(CaseResult(label:, expected:, actual:, passed:))
}

pub fn run_error_decoder() -> Decoder(RunError) {
  use phase <- decode.field("phase", decode.string)
  use line <- decode.optional_field("line", None, decode.optional(decode.int))
  use message <- decode.field("message", decode.string)
  decode.success(RunError(phase:, line:, message:))
}
