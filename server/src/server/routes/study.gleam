//// Study endpoints: boot state, recording reviews, drafts and settings.

import fsrs
import gleam/crypto
import gleam/dynamic/decode
import gleam/http
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/time/timestamp.{type Timestamp}
import server/auth.{type User}
import server/study.{type CardRecord, type Settings, type Today, ProblemRef}
import server/web.{type Context}
import wisp

/// Everything the app needs to start, in one request.
///
/// The client is authoritative for nothing here, including the clock: `now` is
/// the server's time, so due comparisons in the UI agree with the scheduling
/// that produced them even if the device clock is wrong.
pub fn state(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  let now = timestamp.system_time()
  let result = {
    use settings <- result.try(study.load_settings(context.db, user.id))
    use cards <- result.try(study.load_cards(context.db, user.id))
    use drafts <- result.try(study.load_drafts(context.db, user.id))
    use today <- result.try(study.today(context.db, user.id, settings, now))
    Ok(#(settings, cards, drafts, today))
  }

  case result {
    Error(failure) -> study_error(failure)
    Ok(#(settings, cards, drafts, today)) ->
      web.json_ok(
        json.object([
          #("now", json.float(fsrs.to_epoch(now))),
          #("user", accounts_user_json(user)),
          #("settings", settings_json(settings)),
          #("cards", json.array(cards, card_json)),
          #("drafts", json.array(drafts, draft_json)),
          #("today", today_json(today)),
        ]),
      )
  }
}

/// Records one review. The scheduling decision is made here and only here.
pub fn review(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, review_decoder()) {
    Error(_) ->
      web.error(
        422,
        "invalid_body",
        "Expected a problem reference and a rating from 1 to 4.",
      )
    Ok(input) -> {
      let now = timestamp.system_time()
      let outcome = {
        use settings <- result.try(study.load_settings(context.db, user.id))
        use card <- result.try(study.record_review(
          context.db,
          user.id,
          settings,
          input,
          now,
          fuzz_sample(),
        ))
        use today <- result.try(study.today(context.db, user.id, settings, now))
        Ok(#(card, today))
      }

      case outcome {
        Error(failure) -> study_error(failure)
        Ok(#(card, today)) ->
          web.json_ok(
            json.object([
              #("now", json.float(fsrs.to_epoch(now))),
              #("card", card_json(card)),
              #("today", today_json(today)),
            ]),
          )
      }
    }
  }
}

/// Parks or resumes one card: PATCH /api/cards with a problem reference and
/// `suspended`. Answers the same {now, card, today} shape as a review, so the
/// client folds it with the same code.
pub fn suspend(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Patch)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, suspend_decoder()) {
    Error(_) ->
      web.error(
        422,
        "invalid_body",
        "Expected a problem reference and suspended: true or false.",
      )
    Ok(#(problem, suspended)) -> {
      let now = timestamp.system_time()
      let outcome = {
        use settings <- result.try(study.load_settings(context.db, user.id))
        use card <- result.try(study.set_suspended(
          context.db,
          user.id,
          problem,
          suspended,
        ))
        use today <- result.try(study.today(context.db, user.id, settings, now))
        Ok(#(card, today))
      }

      case outcome {
        Error(failure) -> study_error(failure)
        Ok(#(None, _)) ->
          web.error(
            404,
            "unknown_card",
            "That problem has no scheduled card to suspend.",
          )
        Ok(#(Some(card), today)) ->
          web.json_ok(
            json.object([
              #("now", json.float(fsrs.to_epoch(now))),
              #("card", card_json(card)),
              #("today", today_json(today)),
            ]),
          )
      }
    }
  }
}

fn suspend_decoder() -> decode.Decoder(#(study.ProblemRef, Bool)) {
  use problem <- decode.then(problem_decoder())
  use suspended <- decode.field("suspended", decode.bool)
  decode.success(#(problem, suspended))
}

pub fn stats(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  let outcome = {
    use settings <- result.try(study.load_settings(context.db, user.id))
    study.stats(context.db, user.id, settings)
  }

  case outcome {
    Error(failure) -> study_error(failure)
    Ok(stats) -> web.json_ok(stats_json(stats))
  }
}

/// One-time migration of a returning user's localStorage.
///
/// Idempotent by construction: seeding skips problems that already have a
/// card, so a client that retries cannot clobber real scheduling.
pub fn import_legacy(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Post)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, import_decoder()) {
    Error(_) ->
      web.error(
        422,
        "invalid_body",
        "Expected cards, solved problems and drafts.",
      )
    Ok(#(solved, cards, drafts)) -> {
      let outcome = {
        use settings <- result.try(study.load_settings(context.db, user.id))
        study.import_legacy(
          context.db,
          user.id,
          settings,
          solved,
          cards,
          drafts,
          timestamp.system_time(),
        )
      }
      case outcome {
        Error(failure) -> study_error(failure)
        Ok(Nil) -> wisp.no_content()
      }
    }
  }
}

pub fn insights(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  case study.insights(context.db, user.id) {
    Error(failure) -> study_error(failure)
    Ok(insights) -> web.json_ok(insights_json(insights))
  }
}

/// One card's full review log, addressed by query parameters — the problem key
/// is three free-text fields, and burying them in a path would mean escaping
/// "Arrays & Hashing" into it.
pub fn history(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Get)
  use user <- web.require_user(request, context)

  let query = wisp.get_query(request)
  case
    list.key_find(query, "category"),
    list.key_find(query, "subcategory"),
    list.key_find(query, "title")
  {
    Ok(category), Ok(subcategory), Ok(title) ->
      case
        study.history(
          context.db,
          user.id,
          study.ProblemRef(category:, subcategory:, title:),
        )
      {
        Error(failure) -> study_error(failure)
        Ok(reviews) ->
          web.json_ok(
            json.object([
              #("reviews", json.array(reviews, review_row_json)),
            ]),
          )
      }
    _, _, _ ->
      web.error(
        422,
        "invalid_query",
        "Expected category, subcategory and title query parameters.",
      )
  }
}

fn insights_json(insights: study.Insights) -> Json {
  json.object([
    #(
      "cleanSolves",
      json.array(insights.clean_solves, fn(solve) {
        json.object(
          ref_json_fields(solve.problem)
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
          ref_json_fields(reveal.problem)
          |> list.append([#("count", json.int(reveal.count))]),
        )
      }),
    ),
    #(
      "calibration",
      json.array(insights.calibration, fn(row) {
        json.object([
          #("rating", json.int(row.rating)),
          #("total", json.int(row.next_total)),
          #("passed", json.int(row.next_passed)),
        ])
      }),
    ),
  ])
}

fn review_row_json(row: study.ReviewRow) -> Json {
  json.object([
    #("at", json.float(fsrs.to_epoch(row.at))),
    #("rating", json.int(row.rating)),
    #("durationMs", nullable_int(row.duration_ms)),
    #("revealed", json.bool(row.revealed)),
    #("autoFailed", json.bool(row.auto_failed)),
    #("stateBefore", json.int(row.state_before)),
    #("scheduledDays", json.int(row.scheduled_days)),
    #("stabilityAfter", nullable_float(row.stability_after)),
  ])
}

fn ref_json_fields(problem: study.ProblemRef) -> List(#(String, Json)) {
  [
    #("category", json.string(problem.category)),
    #("subcategory", json.string(problem.subcategory)),
    #("title", json.string(problem.title)),
  ]
}

pub fn draft(request: wisp.Request, context: Context) -> wisp.Response {
  use <- wisp.require_method(request, http.Put)
  use user <- web.require_user(request, context)
  use body <- wisp.require_json(request)

  case decode.run(body, draft_decoder()) {
    Error(_) ->
      web.error(422, "invalid_body", "Expected a problem reference and a body.")
    Ok(#(problem, draft_body)) ->
      case study.save_draft(context.db, user.id, problem, draft_body) {
        Error(failure) -> study_error(failure)
        Ok(Nil) -> wisp.no_content()
      }
  }
}

pub fn settings(request: wisp.Request, context: Context) -> wisp.Response {
  use user <- web.require_user(request, context)
  case request.method {
    http.Get ->
      case study.load_settings(context.db, user.id) {
        Error(failure) -> study_error(failure)
        Ok(settings) ->
          web.json_ok(json.object([#("settings", settings_json(settings))]))
      }
    http.Put -> update_settings(request, context, user)
    _ -> wisp.method_not_allowed([http.Get, http.Put])
  }
}

fn update_settings(
  request: wisp.Request,
  context: Context,
  user: User,
) -> wisp.Response {
  use body <- wisp.require_json(request)
  case decode.run(body, settings_decoder()) {
    Error(_) -> web.error(422, "invalid_body", "Expected a settings object.")
    Ok(settings) ->
      case validate_settings(settings) {
        Error(message) -> web.error(422, "invalid_settings", message)
        Ok(settings) ->
          case study.timezone_is_valid(context.db, settings.timezone) {
            Error(failure) -> study_error(failure)
            Ok(False) ->
              web.error(
                422,
                "invalid_settings",
                "Unknown timezone: " <> settings.timezone <> ".",
              )
            Ok(True) ->
              case study.save_settings(context.db, user.id, settings) {
                Error(failure) -> study_error(failure)
                Ok(Nil) ->
                  web.json_ok(
                    json.object([#("settings", settings_json(settings))]),
                  )
              }
          }
      }
  }
}

/// Guard rails on the knobs a user can turn. These bounds are not arbitrary:
/// outside them FSRS produces intervals that are useless rather than merely
/// aggressive.
fn validate_settings(settings: Settings) -> Result(Settings, String) {
  let scheduler = settings.scheduler
  let steps_valid =
    list.all(scheduler.learning_steps, fn(step) { step >= 1 })
    && list.all(scheduler.relearning_steps, fn(step) { step >= 1 })

  case
    list.length(scheduler.parameters) == 21,
    scheduler.desired_retention >=. 0.7 && scheduler.desired_retention <=. 0.99,
    scheduler.maximum_interval >= 1,
    steps_valid,
    settings.new_per_day >= 0 && settings.reviews_per_day >= 0,
    settings.day_start_hour >= 0 && settings.day_start_hour <= 23
  {
    False, _, _, _, _, _ -> Error("Expected exactly 21 FSRS parameters.")
    _, False, _, _, _, _ ->
      Error("Desired retention must be between 0.7 and 0.99.")
    _, _, False, _, _, _ -> Error("Maximum interval must be at least 1 day.")
    _, _, _, False, _, _ ->
      Error("Learning and relearning steps must be at least 1 minute.")
    _, _, _, _, False, _ -> Error("Daily limits cannot be negative.")
    _, _, _, _, _, False -> Error("Day start hour must be between 0 and 23.")
    _, _, _, _, _, _ -> Ok(settings)
  }
}

// --- fuzz ------------------------------------------------------------------

/// The scheduler takes its fuzz sample as an argument so it can stay pure;
/// this is where the randomness actually enters the system.
fn fuzz_sample() -> Float {
  let assert <<value:size(32)>> = crypto.strong_random_bytes(4)
  int.to_float(value) /. 4_294_967_296.0
}

// --- encoding --------------------------------------------------------------

fn accounts_user_json(user: User) -> Json {
  json.object([
    #("id", json.string(user.id)),
    #("email", json.string(user.email)),
  ])
}

fn card_json(record: CardRecord) -> Json {
  let card = record.card
  json.object([
    #("category", json.string(record.problem.category)),
    #("subcategory", json.string(record.problem.subcategory)),
    #("title", json.string(record.problem.title)),
    #("state", json.int(study.state_code(card.state))),
    #("step", nullable_int(study.state_step(card.state))),
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
    #("introducedAt", nullable_epoch(record.introduced_at)),
    #("reps", json.int(record.reps)),
    #("lapses", json.int(record.lapses)),
    #("suspended", json.bool(record.suspended)),
  ])
}

fn draft_json(entry: #(study.ProblemRef, String)) -> Json {
  let #(problem, body) = entry
  json.object([
    #("category", json.string(problem.category)),
    #("subcategory", json.string(problem.subcategory)),
    #("title", json.string(problem.title)),
    #("body", json.string(body)),
  ])
}

fn today_json(today: Today) -> Json {
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

fn stats_json(stats: study.Stats) -> Json {
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

fn settings_json(settings: Settings) -> Json {
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

// --- decoding --------------------------------------------------------------

fn problem_decoder() -> decode.Decoder(study.ProblemRef) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  decode.success(ProblemRef(category:, subcategory:, title:))
}

fn review_decoder() -> decode.Decoder(study.ReviewInput) {
  use problem <- decode.then(problem_decoder())
  use rating <- decode.field("rating", rating_decoder())
  use duration_ms <- decode.optional_field(
    "durationMs",
    None,
    decode.optional(decode.int),
  )
  use auto_failed <- decode.optional_field("autoFailed", False, decode.bool)
  use revealed <- decode.optional_field("revealed", False, decode.bool)
  decode.success(study.ReviewInput(
    problem:,
    rating:,
    duration_ms:,
    auto_failed:,
    revealed:,
  ))
}

fn rating_decoder() -> decode.Decoder(fsrs.Rating) {
  use value <- decode.then(decode.int)
  case fsrs.rating_from_int(value) {
    Ok(rating) -> decode.success(rating)
    Error(Nil) -> decode.failure(fsrs.Good, "Rating")
  }
}

fn import_decoder() -> decode.Decoder(
  #(
    List(study.ProblemRef),
    List(study.ImportCard),
    List(#(study.ProblemRef, String)),
  ),
) {
  // `solved` is the pre-account localStorage format (a sticky boolean, no
  // dates); `cards` is guest-mode state with real scheduling. Both are
  // optional so either migration can post only what it has.
  use solved <- decode.optional_field(
    "solved",
    [],
    decode.list(problem_decoder()),
  )
  use cards <- decode.optional_field(
    "cards",
    [],
    decode.list(import_card_decoder()),
  )
  use drafts <- decode.optional_field(
    "drafts",
    [],
    decode.list(draft_decoder()),
  )
  decode.success(#(solved, cards, drafts))
}

/// Accepts a JSON number whether or not it carries a decimal point.
///
/// This is not defensiveness, it is a real cross-target difference: the app
/// runs on the JavaScript target, and `JSON.stringify` renders a whole float
/// as `1787788818`, not `1787788818.0`. Erlang keeps the decimal, which is why
/// server-to-client never hits this. Every float the *client* sends has to
/// tolerate both, and epoch seconds land on a whole number regularly.
fn lenient_float() -> decode.Decoder(Float) {
  decode.one_of(decode.float, [decode.int |> decode.map(int.to_float)])
}

fn import_card_decoder() -> decode.Decoder(study.ImportCard) {
  use problem <- decode.then(problem_decoder())
  use state <- decode.field("state", decode.int)
  use step <- decode.field("step", decode.optional(decode.int))
  use stability <- decode.field("stability", decode.optional(lenient_float()))
  use difficulty <- decode.field("difficulty", decode.optional(lenient_float()))
  use due <- decode.field("due", lenient_float())
  use last_review <- decode.field(
    "lastReview",
    decode.optional(lenient_float()),
  )
  use reps <- decode.field("reps", decode.int)
  use lapses <- decode.field("lapses", decode.int)
  use introduced_at <- decode.optional_field(
    "introducedAt",
    None,
    decode.optional(lenient_float()),
  )
  decode.success(study.ImportCard(
    problem:,
    // Anything outside 1..3 would violate the state encoding, so it is
    // clamped rather than trusted.
    state: int.clamp(state, 1, 3),
    step:,
    memory: case stability, difficulty {
      Some(stability), Some(difficulty) ->
        Some(fsrs.Memory(stability:, difficulty:))
      _, _ -> None
    },
    due: fsrs.from_epoch(due),
    last_review: option.map(last_review, fsrs.from_epoch),
    reps: int.max(0, reps),
    lapses: int.max(0, lapses),
    introduced_at: option.map(introduced_at, fsrs.from_epoch),
  ))
}

fn draft_decoder() -> decode.Decoder(#(study.ProblemRef, String)) {
  use problem <- decode.then(problem_decoder())
  use body <- decode.field("body", decode.string)
  decode.success(#(problem, body))
}

fn settings_decoder() -> decode.Decoder(Settings) {
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
  decode.success(study.Settings(
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

// --- errors ----------------------------------------------------------------

fn study_error(failure: study.StudyError) -> wisp.Response {
  case failure {
    study.StudyDatabaseError(detail) -> {
      wisp.log_error("study database error: " <> detail)
      web.error(500, "server_error", "Something went wrong. Try again.")
    }
  }
}
