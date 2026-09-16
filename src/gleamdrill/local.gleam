//// Guest mode: spaced repetition with no account, kept in this browser.
////
//// This is a second store, not a cache. A guest's cards live only here; a
//// signed-in user's live only on the server. There is a one-way migration
//// between them and no sync in either direction, which is exactly why nothing
//// in this file has to resolve a conflict.
////
//// The scheduling itself is not reimplemented. `fsrs.review` is the same
//// module the server calls, so a guest and an account given the same answers
//// at the same times produce identical cards. What is reimplemented is the
//// bookkeeping the server does in SQL: the study-day boundary, the daily
//// budget, and the statistics rollups.
////
//// Everything that derives a value is a pure function taking the loaded
//// state. Storage I/O lives at the bottom of the file. That split is what
//// makes the arithmetic testable under `gleam test`, where there is no
//// `localStorage` at all.

import fsrs
import gleam/dict.{type Dict}
import gleam/dynamic/decode.{type Decoder}
import gleam/float
import gleam/int
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/order
import gleam/result
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/api.{type CardState, type Settings}
import gleamdrill/browser
import gleamdrill/model
import gleamdrill/problem.{type ProblemRef}
import plinth/javascript/storage
import wire

/// Split across keys so that saving a draft on every keystroke pause does not
/// rewrite the whole card store.
const cards_key = "gleamDrill.guest.cards.v1"

const drafts_key = "gleamDrill.guest.drafts.v1"

const notes_key = "gleamDrill.guest.notes.v1"

const history_key = "gleamDrill.guest.history.v1"

const flags_key = "gleamDrill.guest.flags.v1"

const reviews_key = "gleamDrill.guest.reviews.v1"

/// A guest's scheduler settings. Its own key rather than a field on `Local`
/// because it is read at boot, before anything else is loaded, and written
/// only from the settings screen -- neither path wants the card store.
const settings_key = "gleamDrill.guest.settings.v1"

/// The review log is a ring buffer: the insight screens read backwards from
/// now, and two thousand reviews is over a year of heavy use in ~250KB.
const review_log_limit = 2000

/// Cards are bounded by the catalogue, but drafts are user-typed code and are
/// not. Keeping the most recently touched few hundred is plenty to feel
/// lossless while leaving room in a ~5MB store.
const draft_limit = 300

/// A guest needs enough at stake for the "you could lose this" warning to be
/// worth reading. Below these, it would just be noise.
const prompt_card_threshold = 10

const prompt_day_threshold = 3

// --- state -----------------------------------------------------------------

/// One study day's answers. `day` is an absolute epoch-day index of the study
/// day's *start*, not a "days ago" offset -- an offset would silently mean
/// something different tomorrow.
pub type DayTally {
  DayTally(day: Int, total: Int, correct: Int)
}

/// Rollups, kept instead of a full review log.
///
/// The log itself is not stored: it grows without bound, and its real consumer
/// is the FSRS optimizer, which only runs server-side. These counters are all
/// the statistics screen actually reads.
pub type History {
  History(
    days: List(DayTally),
    total_reviews: Int,
    mature_reviews: Int,
    mature_correct: Int,
  )
}

pub type Local {
  Local(
    cards: Dict(ProblemRef, CardState),
    drafts: List(#(ProblemRef, String)),
    /// The user's note on a problem. Unlike drafts these are never evicted:
    /// they are short, and a note is exactly the thing you would miss.
    notes: List(#(ProblemRef, String)),
    history: History,
    /// Newest first, capped. The raw material for the insight screens; the
    /// same rows the server keeps in its `reviews` table.
    log: List(#(ProblemRef, api.ReviewRow)),
  )
}

pub fn empty() -> Local {
  Local(
    cards: dict.new(),
    drafts: [],
    notes: [],
    history: empty_history(),
    log: [],
  )
}

fn empty_history() -> History {
  History(days: [], total_reviews: 0, mature_reviews: 0, mature_correct: 0)
}

pub fn is_empty(local: Local) -> Bool {
  dict.is_empty(local.cards) && local.drafts == [] && local.notes == []
}

// --- recording a review ----------------------------------------------------

/// Schedules a review and folds it into local state.
///
/// Mirrors `server/src/server/study.gleam:record_review` deliberately: the
/// rating is scheduled as given and the log keeps the run/reveal truth. The
/// rule staying identical is what lets a guest upgrade without their history
/// changing meaning.
pub fn record(
  local: Local,
  settings: Settings,
  review: api.Review,
  now: Timestamp,
  day_index: Int,
  fuzz: Float,
) -> #(Local, CardState) {
  let existing = dict.get(local.cards, review.problem)
  let before = case existing {
    Ok(state) -> state.card
    Error(Nil) -> fsrs.new_card(now)
  }
  let was_mature = before.state == fsrs.Review

  // The rating is the user's own assessment and is scheduled as given. The
  // log still records `revealed`/`auto_failed` truthfully, so insights can
  // tell a clean solve from a peeked one without the scheduler punishing it.
  let rating = review.rating

  let after = fsrs.review(before, rating, now, settings.scheduler, fuzz)

  let updated =
    wire.CardState(
      problem: review.problem,
      card: after,
      reps: case existing {
        Ok(state) -> state.reps + 1
        Error(Nil) -> 1
      },
      // Anki counts a lapse only when a card that had graduated fails, not
      // when one still in learning does.
      lapses: case existing {
        Ok(state) ->
          case rating == fsrs.Again && was_mature {
            True -> state.lapses + 1
            False -> state.lapses
          }
        Error(Nil) -> 0
      },
      suspended: case existing {
        Ok(state) -> state.suspended
        Error(Nil) -> False
      },
      introduced_at: case existing {
        Ok(wire.CardState(introduced_at: Some(at), ..)) -> Some(at)
        _ -> Some(now)
      },
    )

  let history =
    tally(local.history, day_index, rating != fsrs.Again, was_mature)

  let logged =
    wire.ReviewRow(
      at: now,
      rating:,
      duration_ms: review.duration_ms,
      revealed: review.revealed,
      auto_failed: review.auto_failed,
      state_before: api.state_code(before.state),
      scheduled_days: case before.last_review {
        Some(last) -> fsrs.days_between(last, before.due)
        None -> 0
      },
      stability_after: option.map(updated.card.memory, fn(memory) {
        memory.stability
      }),
      recall: review.recall,
    )

  #(
    Local(
      ..local,
      cards: dict.insert(local.cards, review.problem, updated),
      history:,
      log: [#(review.problem, logged), ..local.log]
        |> list.take(review_log_limit),
    ),
    updated,
  )
}

/// The inverse of `record`, for the newest review only: the log row goes,
/// the day's tally and the totals step back, and the card is put back as
/// it was -- or removed, when that review is what created it. Refuses when
/// the newest row is not this problem's, so a stale undo cannot take back
/// somebody else's grade.
pub fn unrecord(
  local: Local,
  problem: ProblemRef,
  card_before: Option(CardState),
  day_index: Int,
) -> Result(Local, Nil) {
  case local.log {
    [#(logged, row), ..rest] if logged == problem ->
      Ok(
        Local(
          ..local,
          cards: case card_before {
            Some(state) -> dict.insert(local.cards, problem, state)
            None -> dict.delete(local.cards, problem)
          },
          history: untally(
            local.history,
            day_index,
            row.rating != fsrs.Again,
            row.state_before == api.state_code(fsrs.Review),
          ),
          log: rest,
        ),
      )
    _ -> Error(Nil)
  }
}

fn untally(
  history: History,
  day_index: Int,
  correct: Bool,
  mature: Bool,
) -> History {
  History(
    days: list.filter_map(history.days, fn(day) {
      case day.day == day_index {
        False -> Ok(day)
        True ->
          case day.total - 1 {
            0 -> Error(Nil)
            total ->
              Ok(
                DayTally(
                  ..day,
                  total:,
                  correct: int.max(0, day.correct - bit(correct)),
                ),
              )
          }
      }
    }),
    total_reviews: int.max(0, history.total_reviews - 1),
    mature_reviews: int.max(0, history.mature_reviews - bit(mature)),
    mature_correct: int.max(0, history.mature_correct - bit(mature && correct)),
  )
}

fn tally(
  history: History,
  day_index: Int,
  correct: Bool,
  mature: Bool,
) -> History {
  let seen = list.any(history.days, fn(day) { day.day == day_index })
  let days = case seen {
    True ->
      list.map(history.days, fn(day) {
        case day.day == day_index {
          True ->
            DayTally(
              ..day,
              total: day.total + 1,
              correct: day.correct + bit(correct),
            )
          False -> day
        }
      })
    False -> [
      DayTally(day: day_index, total: 1, correct: bit(correct)),
      ..history.days
    ]
  }

  History(
    // A year is all the heatmap shows, and it bounds the key's size.
    days: list.filter(days, fn(day) { day_index - day.day < 365 }),
    total_reviews: history.total_reviews + 1,
    mature_reviews: history.mature_reviews + bit(mature),
    mature_correct: history.mature_correct + bit(mature && correct),
  )
}

fn bit(flag: Bool) -> Int {
  case flag {
    True -> 1
    False -> 0
  }
}

pub fn put_draft(local: Local, problem: ProblemRef, body: String) -> Local {
  Local(
    ..local,
    // `assoc_put` moves the entry to the front, so truncating keeps the most
      // recently touched drafts and drops the ones long abandoned.
      drafts: model.assoc_put(local.drafts, problem, body)
      |> list.take(draft_limit),
  )
}

/// A blank note is removed rather than kept, so the store only ever holds
/// notes with something in them.
pub fn put_note(local: Local, problem: ProblemRef, body: String) -> Local {
  let others = list.filter(local.notes, fn(entry) { entry.0 != problem })
  Local(..local, notes: case string.trim(body) {
    "" -> others
    _ -> [#(problem, body), ..others]
  })
}

// --- export and restore ----------------------------------------------------

/// Everything in the guest store as one archive, oldest review first.
pub fn archive(
  local: Local,
  settings: Settings,
  now: Timestamp,
) -> wire.Archive {
  wire.Archive(
    version: wire.archive_version,
    exported_at: now,
    settings:,
    cards: dict.values(local.cards),
    reviews: list.reverse(local.log),
    drafts: local.drafts,
    notes: local.notes,
  )
}

/// A guest store built from an archive, replacing whatever was there. The
/// day tallies and totals are re-derived from the log, so a file made by
/// an account (which keeps no tallies) restores as well as a guest's own.
pub fn restore(archive: wire.Archive) -> Local {
  let log =
    archive.reviews
    |> list.sort(fn(a, b) {
      timestamp.compare({ a.1 }.at, { b.1 }.at) |> order.negate
    })
    |> list.take(review_log_limit)
  let history =
    log
    |> list.reverse
    |> list.fold(empty_history(), fn(history, entry) {
      let #(_, row) = entry
      let day =
        browser.study_day_index_at(
          float.round(fsrs.to_epoch(row.at)),
          archive.settings.day_start_hour,
        )
      tally(
        history,
        day,
        row.rating != fsrs.Again,
        row.state_before == api.state_code(fsrs.Review),
      )
    })
  Local(
    cards: archive.cards
      |> list.map(fn(card: CardState) { #(card.problem, card) })
      |> dict.from_list,
    drafts: list.take(archive.drafts, draft_limit),
    notes: archive.notes,
    history:,
    log:,
  )
}

/// Writes every key at once, for a restore.
pub fn save_all(local: Local, settings: Settings) -> Result(Nil, Nil) {
  use _ <- result.try(save_settings(settings))
  use _ <- result.try(save_cards(local))
  use _ <- result.try(save_drafts(local))
  use _ <- result.try(save_notes(local))
  save_history(local)
}

// --- derived views ---------------------------------------------------------

/// Where the guest stands against today's limits.
///
/// `day_start` is passed in rather than read from a clock so this stays pure;
/// the caller gets it from `browser.study_day_start`.
/// Parks or resumes one card. No review row, no history entry: suspension is
/// schedule state, not study activity. Missing card -> Error(Nil), mirroring
/// the server's 404.
pub fn set_suspended(
  local: Local,
  problem: problem.ProblemRef,
  suspended: Bool,
) -> Result(#(Local, api.CardState), Nil) {
  case dict.get(local.cards, problem) {
    Error(Nil) -> Error(Nil)
    Ok(state) -> {
      let updated = wire.CardState(..state, suspended:)
      Ok(#(
        Local(..local, cards: dict.insert(local.cards, problem, updated)),
        updated,
      ))
    }
  }
}

/// Puts problems into the study queue by giving each one a card, and answers
/// with the state of every problem named -- already-queued ones included, so
/// the caller folds one list rather than diffing.
///
/// `introduced_at` stays `None`: it means "first studied", and `today` counts
/// it against the daily new budget. `record` stamps it on the first review.
/// Mirrors `study.enqueue_cards` on the server, including that.
pub fn enqueue(
  local: Local,
  problems: List(problem.ProblemRef),
  now: Timestamp,
) -> #(Local, List(api.CardState)) {
  let cards =
    list.fold(problems, local.cards, fn(cards, problem) {
      case dict.has_key(cards, problem) {
        True -> cards
        False ->
          dict.insert(
            cards,
            problem,
            wire.CardState(
              problem:,
              card: fsrs.new_card(now),
              reps: 0,
              lapses: 0,
              suspended: False,
              introduced_at: None,
            ),
          )
      }
    })

  #(
    Local(..local, cards:),
    list.filter_map(problems, fn(problem) { dict.get(cards, problem) }),
  )
}

/// Takes problems out of the study queue, and reports which it refused.
///
/// A card with `reps > 0` is kept: the guest's review log is keyed by problem
/// and dropping the card would orphan it, exactly as deleting the server's row
/// would cascade its reviews away. Those come back as the second list and the
/// caller parks them instead.
pub fn dequeue(
  local: Local,
  problems: List(problem.ProblemRef),
) -> #(Local, List(problem.ProblemRef), List(problem.ProblemRef)) {
  let removable =
    list.filter(problems, fn(problem) {
      case dict.get(local.cards, problem) {
        Ok(state) -> state.reps == 0
        Error(Nil) -> False
      }
    })
  let refused =
    list.filter(problems, fn(problem) { !list.contains(removable, problem) })

  #(
    Local(
      ..local,
      cards: list.fold(removable, local.cards, fn(cards, problem) {
        dict.delete(cards, problem)
      }),
    ),
    removable,
    refused,
  )
}

pub fn today(
  local: Local,
  settings: Settings,
  now: Timestamp,
  day: StudyDay,
) -> api.Today {
  let day_start = day.start
  let today_index = day.index
  let reviews_done = case
    list.find(local.history.days, fn(day) { day.day == today_index })
  {
    Ok(day) -> day.total
    Error(Nil) -> 0
  }

  let boundary = fsrs.from_epoch(int.to_float(day_start))
  let new_introduced =
    dict.fold(local.cards, 0, fn(count, _problem, state) {
      case state.introduced_at {
        Some(at) ->
          case fsrs.to_epoch(at) >=. int.to_float(day_start) {
            True -> count + 1
            False -> count
          }
        None -> count
      }
    })

  wire.Today(
    day_start: boundary,
    day_end: fsrs.from_epoch(int.to_float(day_start + 86_400)),
    reviews_done:,
    new_introduced:,
    reviews_remaining: int.max(0, settings.reviews_per_day - reviews_done),
    new_remaining: int.max(0, settings.new_per_day - new_introduced),
    due_now: due_count(local, now),
  )
}

/// `reps > 0` is what separates a review from a new card: a card queued but
/// never answered is due from the moment it is created, and counting it here
/// would report the whole New pile as Due.
fn due_count(local: Local, now: Timestamp) -> Int {
  use count, _problem, state <- dict.fold(local.cards, 0)
  case state.reps > 0 && !state.suspended && fsrs.is_due(state.card, now) {
    True -> count + 1
    False -> count
  }
}

pub fn stats(local: Local, now: Timestamp, day: StudyDay) -> api.Stats {
  let today_index = day.index
  let history =
    local.history.days
    |> list.map(fn(day) {
      wire.DayTally(
        days_ago: today_index - day.day,
        total: day.total,
        correct: day.correct,
      )
    })
    |> list.filter(fn(day) { day.days_ago >= 0 })

  wire.Stats(
    total_reviews: local.history.total_reviews,
    mature_reviews: local.history.mature_reviews,
    mature_correct: local.history.mature_correct,
    state_counts: state_counts(local),
    history:,
    forecast: forecast(local, now),
    streak_days: streak(history),
  )
}

fn state_counts(local: Local) -> List(#(Int, Int)) {
  [1, 2, 3]
  |> list.map(fn(code) {
    #(
      code,
      dict.fold(local.cards, 0, fn(count, _problem, state) {
        case api.state_code(state.card.state) == code {
          True -> count + 1
          False -> count
        }
      }),
    )
  })
  |> list.filter(fn(entry) { entry.1 > 0 })
}

/// Cards falling due in each of the next 30 days. Anything overdue counts
/// against today, which is where it will actually be studied.
fn forecast(local: Local, now: Timestamp) -> List(#(Int, Int)) {
  let counts =
    dict.fold(local.cards, dict.new(), fn(acc, _problem, state) {
      case state.suspended {
        True -> acc
        False -> {
          let days = int.max(0, fsrs.interval_seconds(state.card, now) / 86_400)
          case days < 30 {
            True ->
              dict.upsert(acc, days, fn(existing) {
                option.unwrap(existing, 0) + 1
              })
            False -> acc
          }
        }
      }
    })

  dict.to_list(counts) |> list.sort(fn(a, b) { int.compare(a.0, b.0) })
}

/// Consecutive study days ending today, or ending yesterday if today has no
/// reviews yet -- a streak should not read as broken just because the user has
/// not sat down yet. Same rule as `server/src/server/study.gleam:streak`.
pub fn streak(history: List(api.DayTally)) -> Int {
  let days =
    history |> list.map(fn(day) { day.days_ago }) |> list.sort(int.compare)
  case days {
    [0, ..] -> run_length(days, 0)
    [1, ..] -> run_length(days, 1)
    _ -> 0
  }
}

fn run_length(days: List(Int), expected: Int) -> Int {
  case days {
    [first, ..rest] if first == expected -> 1 + run_length(rest, expected + 1)
    _ -> 0
  }
}

/// Whether the stronger upgrade prompt is owed, reading both the thresholds
/// and the shown-once flag.
///
/// One place decides this, so the prompt behaves the same whether it is
/// evaluated on load or straight after a review. Without the load path a
/// returning guest with fifty cards would never see it, having crossed the
/// threshold in an earlier session.
pub fn prompt_state(day: StudyDay) -> model.UpgradePrompt {
  case prompt_dismissed() {
    True -> model.PromptDismissed
    False ->
      case worth_warning_about(load(), day.index) {
        True -> model.PromptShowing
        False -> model.PromptUnseen
      }
  }
}

/// Answered cards, not queued ones. Queueing a topic is a click and can be
/// redone in another click; a card with reviews behind it is the thing that
/// cannot be rebuilt, and it is what the warning is about.
fn worth_warning_about(local: Local, today_index: Int) -> Bool {
  let study_days =
    list.length(
      list.filter(local.history.days, fn(day) { today_index - day.day < 365 }),
    )
  answered_count(local) >= prompt_card_threshold
  || study_days >= prompt_day_threshold
}

pub fn answered_count(local: Local) -> Int {
  dict.fold(local.cards, 0, fn(count, _problem, state) {
    case state.reps > 0 {
      True -> count + 1
      False -> count
    }
  })
}

// --- storage ---------------------------------------------------------------

pub fn load() -> Local {
  Local(
    cards: read(cards_key, decode.list(api.card_decoder()))
      |> option.unwrap([])
      |> list.map(fn(card: CardState) { #(card.problem, card) })
      |> dict.from_list,
    drafts: read(drafts_key, decode.list(draft_decoder()))
      |> option.unwrap([]),
    notes: read(notes_key, decode.list(draft_decoder()))
      |> option.unwrap([]),
    history: read(history_key, history_decoder())
      |> option.unwrap(empty_history()),
    log: read(reviews_key, decode.list(log_row_decoder()))
      |> option.unwrap([]),
  )
}

/// True when this browser holds guest progress worth migrating.
pub fn has_data() -> Bool {
  !is_empty(load())
}

pub fn prompt_dismissed() -> Bool {
  read(flags_key, {
    use dismissed <- decode.field("upgradePromptDismissed", decode.bool)
    decode.success(dismissed)
  })
  |> option.unwrap(False)
}

pub fn dismiss_prompt() -> Result(Nil, Nil) {
  write(
    flags_key,
    json.to_string(json.object([#("upgradePromptDismissed", json.bool(True))])),
  )
}

/// This browser's scheduler settings, or the defaults if it has never had any.
///
/// Guest settings used to be re-defaulted on every page load, which meant the
/// settings screen appeared to work and then silently forgot. Every other
/// guest path already reads `Model.settings`; only boot needed fixing.
pub fn load_settings() -> wire.Settings {
  read(settings_key, wire.settings_decoder())
  |> option.unwrap(wire.default_settings())
}

pub fn save_settings(settings: wire.Settings) -> Result(Nil, Nil) {
  write(settings_key, json.to_string(wire.settings_to_json(settings)))
}

pub fn save_cards(local: Local) -> Result(Nil, Nil) {
  write(
    cards_key,
    json.to_string(json.array(dict.values(local.cards), api.card_json)),
  )
}

pub fn save_drafts(local: Local) -> Result(Nil, Nil) {
  write(drafts_key, json.to_string(json.array(local.drafts, draft_json)))
}

pub fn save_notes(local: Local) -> Result(Nil, Nil) {
  write(notes_key, json.to_string(json.array(local.notes, draft_json)))
}

pub fn save_history(local: Local) -> Result(Nil, Nil) {
  case write(history_key, json.to_string(history_json(local.history))) {
    Ok(Nil) ->
      write(reviews_key, json.to_string(json.array(local.log, log_row_json)))
    Error(Nil) -> Error(Nil)
  }
}

/// Wipes guest state. Called after a successful upgrade, so that signing out
/// later does not resurrect a stale copy of what is now on the server.
pub fn clear() -> Nil {
  case storage.local() {
    Error(Nil) -> Nil
    Ok(local) -> {
      list.each(
        [
          cards_key,
          drafts_key,
          notes_key,
          history_key,
          flags_key,
          reviews_key,
          settings_key,
        ],
        fn(key) { storage.remove_item(local, key) },
      )
    }
  }
}

/// Unlike a keymap preference, a failed study-data write must not be swallowed:
/// a guest would go on believing their progress was safe. The caller raises a
/// persistent warning on `Error`.
fn write(key: String, value: String) -> Result(Nil, Nil) {
  case storage.local() {
    Error(Nil) -> Error(Nil)
    Ok(local) -> storage.set_item(local, key, value)
  }
}

fn read(key: String, decoder: Decoder(value)) -> Option(value) {
  case storage.local() {
    Error(Nil) -> None
    Ok(local) ->
      storage.get_item(local, key)
      |> result.try(fn(raw) {
        json.parse(raw, decoder) |> result.replace_error(Nil)
      })
      |> option.from_result
  }
}

fn draft_json(entry: #(ProblemRef, String)) -> Json {
  let #(problem, body) = entry
  json.object([
    #("category", json.string(problem.category)),
    #("subcategory", json.string(problem.subcategory)),
    #("title", json.string(problem.title)),
    #("body", json.string(body)),
  ])
}

fn draft_decoder() -> Decoder(#(ProblemRef, String)) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  use body <- decode.field("body", decode.string)
  decode.success(#(wire.ProblemRef(category:, subcategory:, title:), body))
}

fn history_json(history: History) -> Json {
  json.object([
    #("totalReviews", json.int(history.total_reviews)),
    #("matureReviews", json.int(history.mature_reviews)),
    #("matureCorrect", json.int(history.mature_correct)),
    #(
      "days",
      json.array(history.days, fn(day) {
        json.object([
          #("day", json.int(day.day)),
          #("total", json.int(day.total)),
          #("correct", json.int(day.correct)),
        ])
      }),
    ),
  ])
}

fn history_decoder() -> Decoder(History) {
  use total_reviews <- decode.field("totalReviews", decode.int)
  use mature_reviews <- decode.field("matureReviews", decode.int)
  use mature_correct <- decode.field("matureCorrect", decode.int)
  use days <- decode.field(
    "days",
    decode.list({
      use day <- decode.field("day", decode.int)
      use total <- decode.field("total", decode.int)
      use correct <- decode.field("correct", decode.int)
      decode.success(DayTally(day:, total:, correct:))
    }),
  )
  decode.success(History(
    days:,
    total_reviews:,
    mature_reviews:,
    mature_correct:,
  ))
}

/// The current study day, both ways it gets used.
///
/// These travel together because they are two different units -- epoch seconds
/// and a day number -- that are both `Int`, and passing one where the other
/// belongs type-checks silently. It has already happened once.
///
/// `index` comes from the calendar rather than from dividing `start`: across a
/// daylight-saving change consecutive study days are 82800 or 90000 seconds
/// apart, so the quotient can repeat or skip and a streak would break twice a
/// year.
pub type StudyDay {
  StudyDay(start: Int, index: Int)
}

pub fn current_day(settings: Settings) -> StudyDay {
  StudyDay(
    start: browser.study_day_start(settings.day_start_hour),
    index: browser.study_day_index(settings.day_start_hour),
  )
}

/// Folds the pre-account localStorage format into the guest store, once.
///
/// Solved problems become review cards seeded from what a `Good` first answer
/// earns -- the same seed the server uses for this migration, and for the same
/// reason: the old format stored a sticky boolean and no dates at all, so
/// there is no real schedule to recover, only a starting point.
///
/// Anything already in the guest store wins, so this can never overwrite a
/// card the guest has actually drilled.
pub fn seed_from_legacy(
  solved: List(ProblemRef),
  drafts: List(#(ProblemRef, String)),
) -> Nil {
  let store = load()
  let settings = api.default_settings()
  let now = timestamp.system_time()
  let seed = fsrs.initial_memory(settings.scheduler, fsrs.Good)

  let cards =
    list.fold(solved, store.cards, fn(cards, problem) {
      case dict.has_key(cards, problem) {
        True -> cards
        False ->
          dict.insert(
            cards,
            problem,
            wire.CardState(
              problem:,
              card: fsrs.Card(
                state: fsrs.Review,
                memory: Some(seed),
                due: now,
                last_review: None,
              ),
              // One, not zero. A zero-rep card is one that was queued and
              // never opened; this one was recorded as solved by the old app,
              // which is what the seeded memory says. Left at zero it would be
              // served as new and counted out of every statistic.
              reps: 1,
              lapses: 0,
              suspended: False,
              introduced_at: Some(now),
            ),
          )
      }
    })

  let seeded =
    list.fold(drafts, Local(..store, cards:), fn(acc, entry) {
      case model.assoc_get(acc.drafts, entry.0) {
        Ok(_) -> acc
        Error(Nil) -> put_draft(acc, entry.0, entry.1)
      }
    })

  let _ = save_cards(seeded)
  let _ = save_drafts(seeded)
  Nil
}

// --- the insight payloads, guest edition -----------------------------------

/// The wire shape `/api/insights` produces, computed from the local log so
/// `insights.analyse` cannot tell a guest from an account.
pub fn insights(local: Local) -> api.Insights {
  let chronological = list.reverse(local.log)

  let clean =
    list.filter_map(chronological, fn(entry) {
      let #(problem, row) = entry
      // A recall-only review has no code behind it, so it says nothing
      // about how fast the problem can be solved.
      case
        fsrs.rating_to_int(row.rating) > 1
        && !row.revealed
        && !row.auto_failed
        && !row.recall,
        row.duration_ms
      {
        True, Some(duration_ms) ->
          Ok(wire.CleanSolve(problem:, at: row.at, duration_ms:))
        _, _ -> Error(Nil)
      }
    })
  // Last five per problem, oldest first, matching the server's window.
  let clean_solves =
    list.fold(clean, dict.new(), fn(acc, solve: api.CleanSolve) {
      dict.upsert(acc, solve.problem, fn(existing) {
        [solve, ..option.unwrap(existing, [])] |> list.take(5)
      })
    })
    |> dict.values
    |> list.flat_map(list.reverse)

  let reveals =
    list.fold(chronological, dict.new(), fn(acc, entry) {
      let #(problem, row) = entry
      case row.revealed {
        True -> dict.upsert(acc, problem, fn(n) { option.unwrap(n, 0) + 1 })
        False -> acc
      }
    })
    |> dict.to_list

  wire.Insights(
    clean_solves:,
    reveals:,
    calibration: calibration(chronological),
  )
}

/// For each grade pressed, what the card's next review did — the guest
/// version of the server's LEAD window.
fn calibration(
  chronological: List(#(ProblemRef, api.ReviewRow)),
) -> List(api.Calibration) {
  let by_problem =
    list.fold(chronological, dict.new(), fn(acc, entry) {
      let #(problem, row) = entry
      dict.upsert(acc, problem, fn(rows) { [row, ..option.unwrap(rows, [])] })
    })
    |> dict.map_values(fn(_problem, rows) { list.reverse(rows) })

  let pairs =
    dict.values(by_problem)
    |> list.flat_map(fn(rows) { list.zip(rows, list.drop(rows, 1)) })

  [fsrs.Again, fsrs.Hard, fsrs.Good, fsrs.Easy]
  |> list.filter_map(fn(rating) {
    let nexts = list.filter(pairs, fn(pair) { { pair.0 }.rating == rating })
    case nexts {
      [] -> Error(Nil)
      _ ->
        Ok(wire.Calibration(
          rating:,
          total: list.length(nexts),
          passed: list.count(nexts, fn(pair) {
            let next = pair.1
            fsrs.rating_to_int(next.rating) > 1
            && !next.revealed
            && !next.auto_failed
          }),
        ))
    }
  })
}

/// One card's review rows, oldest first — the wire shape of `/api/history`.
pub fn history_of(local: Local, problem: ProblemRef) -> List(api.ReviewRow) {
  local.log
  |> list.filter_map(fn(entry) {
    case entry.0 == problem {
      True -> Ok(entry.1)
      False -> Error(Nil)
    }
  })
  |> list.reverse
}

fn log_row_json(entry: #(ProblemRef, api.ReviewRow)) -> Json {
  let #(problem, row) = entry
  json.object([
    #("category", json.string(problem.category)),
    #("subcategory", json.string(problem.subcategory)),
    #("title", json.string(problem.title)),
    #("at", json.float(fsrs.to_epoch(row.at))),
    #("rating", json.int(fsrs.rating_to_int(row.rating))),
    #("durationMs", case row.duration_ms {
      Some(ms) -> json.int(ms)
      None -> json.null()
    }),
    #("revealed", json.bool(row.revealed)),
    #("autoFailed", json.bool(row.auto_failed)),
    #("stateBefore", json.int(row.state_before)),
    #("scheduledDays", json.int(row.scheduled_days)),
    #("stabilityAfter", case row.stability_after {
      Some(stability) -> json.float(stability)
      None -> json.null()
    }),
    #("recall", json.bool(row.recall)),
  ])
}

fn log_row_decoder() -> Decoder(#(ProblemRef, api.ReviewRow)) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  use row <- decode.then(api.review_row_decoder())
  decode.success(#(wire.ProblemRef(category:, subcategory:, title:), row))
}
