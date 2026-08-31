//// Study endpoints: boot state, recording reviews, drafts and settings.

import fsrs
import gleam/crypto
import gleam/dynamic/decode
import gleam/http
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/time/timestamp
import server/auth.{type User}
import server/study.{type CardRecord, type Settings}
import server/web.{type Context}
import wire
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
          wire.ProblemRef(category:, subcategory:, title:),
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

/// A stored card minus the database id, which never crosses the wire. This is
/// the only shape difference between what the server keeps and what it sends,
/// and it is why `CardRecord` is not itself a wire type.
fn card_json(record: CardRecord) -> Json {
  wire.card_to_json(wire.CardState(
    problem: record.problem,
    card: record.card,
    reps: record.reps,
    lapses: record.lapses,
    suspended: record.suspended,
    introduced_at: record.introduced_at,
  ))
}

const accounts_user_json = wire.user_to_json

const draft_json = wire.draft_to_json

const today_json = wire.today_to_json

const stats_json = wire.stats_to_json

const settings_json = wire.settings_to_json

const insights_json = wire.insights_to_json

const review_row_json = wire.review_row_to_json

// --- decoding --------------------------------------------------------------

const problem_decoder = wire.ref_decoder

const review_decoder = wire.review_decoder

const lenient_float = wire.lenient_float

const draft_decoder = wire.draft_decoder

const settings_decoder = wire.settings_decoder

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

// --- errors ----------------------------------------------------------------

fn study_error(failure: study.StudyError) -> wisp.Response {
  case failure {
    study.StudyDatabaseError(detail) -> {
      wisp.log_error("study database error: " <> detail)
      web.error(500, "server_error", "Something went wrong. Try again.")
    }
  }
}
