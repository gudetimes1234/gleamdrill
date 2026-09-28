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

const history_key = "gleamDrill.guest.history.v2"

/// The pre-tracks rollups: one set for the whole store. Read once, to seed
/// `.v2`, and then left alone -- for a release, so a browser that falls back
/// to the cached previous bundle still finds its own. See `adopt_history`.
const legacy_history_key = "gleamDrill.guest.history.v1"

const flags_key = "gleamDrill.guest.flags.v1"

const reviews_key = "gleamDrill.guest.reviews.v1"

/// Named queues, as the wire set (`{"queues": [...]}`) so the encoder and
/// decoder are the same pair the server speaks.
const queues_key = "gleamDrill.guest.queues.v1"

/// A guest's scheduler settings. Its own key rather than a field on `Local`
/// because it is read at boot, before anything else is loaded, and written
/// only from the settings screen -- neither path wants the card store.
const settings_key = "gleamDrill.guest.settings.v2"

/// The pre-tracks settings: one flat blob holding both halves. Read once, to
/// seed `.v2`, and then left alone, for the same reason. See
/// `adopt_settings`.
const legacy_settings_key = "gleamDrill.guest.settings.v1"

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
    /// Rollups per track, keyed by track name. A track nobody has answered
    /// in has no entry and reads as empty.
    ///
    /// **This record is always the whole store.** `load` reads every track
    /// and every save writes every track, because each `save_*` serialises
    /// the whole of `Local`: a filtered `load` followed by one debounced
    /// draft write would delete every other track's cards. Only the derived
    /// functions below take a track.
    history: List(#(String, History)),
    /// Newest first, capped. The raw material for the insight screens; the
    /// same rows the server keeps in its `reviews` table.
    log: List(#(ProblemRef, api.ReviewRow)),
    /// Named lists to study from; scheduling stays in `cards`.
    queues: List(wire.Queue),
  )
}

pub fn empty() -> Local {
  Local(
    cards: dict.new(),
    drafts: [],
    notes: [],
    history: [],
    log: [],
    queues: [],
  )
}

fn empty_history() -> History {
  History(days: [], total_reviews: 0, mature_reviews: 0, mature_correct: 0)
}

pub fn is_empty(local: Local) -> Bool {
  dict.is_empty(local.cards)
  && local.drafts == []
  && local.notes == []
  && local.queues == []
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

  // The ref carries the track, so a review is tallied against its own
  // problem's track and no other's.
  let track = review.problem.category
  let history =
    put_history(
      local,
      track,
      tally(
        history_for(local, track),
        day_index,
        rating != fsrs.Again,
        was_mature,
      ),
    )

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
      // A graded problem starts from the stub next time: the draft goes
      // with the review, as it does on the server.
      drafts: drop_draft(local.drafts, review.problem),
    ),
    updated,
  )
}

pub fn drop_draft(
  drafts: List(#(ProblemRef, String)),
  problem: ProblemRef,
) -> List(#(ProblemRef, String)) {
  list.filter(drafts, fn(entry) { entry.0 != problem })
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
          history: put_history(
            local,
            problem.category,
            untally(
              history_for(local, problem.category),
              day_index,
              row.rating != fsrs.Again,
              row.state_before == api.state_code(fsrs.Review),
            ),
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

/// This track's rollups, or empty ones. A track nobody has answered in has
/// no entry, which is not the same as a stored zero -- and the difference is
/// only ever invisible, because both read as nothing studied.
pub fn history_for(local: Local, track: String) -> History {
  list.key_find(local.history, track) |> result.unwrap(empty_history())
}

/// Replaces one track's rollups, leaving every other track's alone.
fn put_history(
  local: Local,
  track: String,
  history: History,
) -> List(#(String, History)) {
  [#(track, history), ..list.filter(local.history, fn(e) { e.0 != track })]
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
  account: wire.AccountSettings,
  tracks: List(#(String, Settings)),
  now: Timestamp,
) -> wire.Archive {
  wire.Archive(
    version: wire.archive_version,
    exported_at: now,
    account:,
    tracks:,
    cards: dict.values(local.cards),
    reviews: list.reverse(local.log),
    drafts: local.drafts,
    notes: local.notes,
    queues: local.queues,
  )
}

/// Which track gets which settings, out of an archive.
///
/// A file from before tracks has one blob under the "" key, meaning "every
/// track", so it is fanned out across the tracks its own cards name. A newer
/// file already has a row per track. Mirrors `study.archive_tracks` on the
/// server, deliberately: a file made by one has to restore into the other.
pub fn archive_tracks(archive: wire.Archive) -> List(#(String, Settings)) {
  case list.key_find(archive.tracks, "") {
    Error(Nil) -> list.filter(archive.tracks, fn(entry) { entry.0 != "" })
    Ok(shared) ->
      archive.cards
      |> list.map(fn(card: CardState) { card.problem.category })
      |> list.unique
      |> list.map(fn(track) { #(track, shared) })
  }
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
    |> list.fold([], fn(histories, entry) {
      let #(problem, row) = entry
      let track = problem.category
      let day =
        browser.study_day_index_at(
          float.round(fsrs.to_epoch(row.at)),
          archive.account.day_start_hour,
        )
      let tallied =
        tally(
          list.key_find(histories, track) |> result.unwrap(empty_history()),
          day,
          row.rating != fsrs.Again,
          row.state_before == api.state_code(fsrs.Review),
        )
      [#(track, tallied), ..list.filter(histories, fn(e) { e.0 != track })]
    })
  Local(
    cards: archive.cards
      |> list.map(fn(card: CardState) { #(card.problem, card) })
      |> dict.from_list,
    drafts: list.take(archive.drafts, draft_limit),
    notes: archive.notes,
    history:,
    log:,
    queues: archive.queues,
  )
}

/// Writes every key at once, for a restore. An archive is the whole account,
/// so this replaces every track's settings rather than one track's.
pub fn save_all(
  local: Local,
  account: wire.AccountSettings,
  tracks: List(#(String, Settings)),
) -> Result(Nil, Nil) {
  use _ <- result.try(write_stored(Stored(account:, tracks:)))
  use _ <- result.try(save_cards(local))
  use _ <- result.try(save_drafts(local))
  use _ <- result.try(save_notes(local))
  use _ <- result.try(save_queues(local))
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
  track: String,
  settings: Settings,
  now: Timestamp,
  day: StudyDay,
) -> api.Today {
  let day_start = day.start
  let today_index = day.index
  let reviews_done = case
    list.find(history_for(local, track).days, fn(day) { day.day == today_index })
  {
    Ok(day) -> day.total
    Error(Nil) -> 0
  }

  let boundary = fsrs.from_epoch(int.to_float(day_start))
  let new_introduced =
    dict.fold(local.cards, 0, fn(count, problem: ProblemRef, state) {
      case problem.category == track, state.introduced_at {
        True, Some(at) ->
          case fsrs.to_epoch(at) >=. int.to_float(day_start) {
            True -> count + 1
            False -> count
          }
        _, _ -> count
      }
    })

  wire.Today(
    day_start: boundary,
    day_end: fsrs.from_epoch(int.to_float(day_start + 86_400)),
    reviews_done:,
    new_introduced:,
    reviews_remaining: int.max(0, settings.reviews_per_day - reviews_done),
    new_remaining: int.max(0, settings.new_per_day - new_introduced),
    due_now: due_count(local, track, now),
  )
}

/// `reps > 0` is what separates a review from a new card: a card queued but
/// never answered is due from the moment it is created, and counting it here
/// would report the whole New pile as Due.
fn due_count(local: Local, track: String, now: Timestamp) -> Int {
  use count, problem: ProblemRef, state <- dict.fold(local.cards, 0)
  case
    problem.category == track
    && state.reps > 0
    && !state.suspended
    && fsrs.is_due(state.card, now)
  {
    True -> count + 1
    False -> count
  }
}

pub fn stats(
  local: Local,
  track: String,
  now: Timestamp,
  day: StudyDay,
) -> api.Stats {
  let today_index = day.index
  let rollup = history_for(local, track)
  let history =
    rollup.days
    |> list.map(fn(day) {
      wire.DayTally(
        days_ago: today_index - day.day,
        total: day.total,
        correct: day.correct,
      )
    })
    |> list.filter(fn(day) { day.days_ago >= 0 })

  wire.Stats(
    total_reviews: rollup.total_reviews,
    mature_reviews: rollup.mature_reviews,
    mature_correct: rollup.mature_correct,
    state_counts: state_counts(local, track),
    history:,
    forecast: forecast(local, track, now),
    streak_days: streak(history),
  )
}

fn state_counts(local: Local, track: String) -> List(#(Int, Int)) {
  [1, 2, 3]
  |> list.map(fn(code) {
    #(
      code,
      dict.fold(local.cards, 0, fn(count, problem: ProblemRef, state) {
        case
          problem.category == track && api.state_code(state.card.state) == code
        {
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
fn forecast(local: Local, track: String, now: Timestamp) -> List(#(Int, Int)) {
  let counts =
    dict.fold(local.cards, dict.new(), fn(acc, problem: ProblemRef, state) {
      case state.suspended || problem.category != track {
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
/// Whole-account, deliberately: the warning is that everything in this
/// browser is at risk, and that is not a per-track fact. A day studied in any
/// track is a day studied.
fn worth_warning_about(local: Local, today_index: Int) -> Bool {
  let study_days =
    local.history
    |> list.flat_map(fn(entry) { { entry.1 }.days })
    |> list.filter(fn(day) { today_index - day.day < 365 })
    |> list.map(fn(day) { day.day })
    |> list.unique
    |> list.length
  answered_count_all(local) >= prompt_card_threshold
  || study_days >= prompt_day_threshold
}

/// Answered cards in every track. The upgrade nudge's number.
pub fn answered_count_all(local: Local) -> Int {
  dict.fold(local.cards, 0, fn(count, _problem, state) {
    case state.reps > 0 {
      True -> count + 1
      False -> count
    }
  })
}

pub fn answered_count(local: Local, track: String) -> Int {
  dict.fold(local.cards, 0, fn(count, problem: ProblemRef, state) {
    case problem.category == track && state.reps > 0 {
      True -> count + 1
      False -> count
    }
  })
}

/// One track's cards, drafts, notes and queues -- what a boot payload for
/// that track carries. The store itself stays whole; these are the lenses.
pub fn cards_in(local: Local, track: String) -> List(CardState) {
  dict.values(local.cards)
  |> list.filter(fn(card: CardState) { card.problem.category == track })
}

pub fn drafts_in(local: Local, track: String) -> List(#(ProblemRef, String)) {
  list.filter(local.drafts, fn(entry) { { entry.0 }.category == track })
}

pub fn notes_in(local: Local, track: String) -> List(#(ProblemRef, String)) {
  list.filter(local.notes, fn(entry) { { entry.0 }.category == track })
}

pub fn queues_in(local: Local, track: String) -> List(wire.Queue) {
  list.filter(local.queues, fn(queue: wire.Queue) { queue.track == track })
}

/// Where every track stands, for the switcher.
///
/// Built from the cards for the same reason the server's is: a track holding
/// real cards under a name the catalogue no longer has should appear rather
/// than vanish.
pub fn standings(
  local: Local,
  settings: fn(String) -> Settings,
  now: Timestamp,
  day: StudyDay,
) -> List(wire.TrackStanding) {
  dict.values(local.cards)
  |> list.map(fn(card: CardState) { card.problem.category })
  |> list.unique
  |> list.sort(string.compare)
  |> list.map(fn(track) {
    let counts = today(local, track, settings(track), now, day)
    wire.TrackStanding(
      track:,
      settings: settings(track),
      cards: list.length(cards_in(local, track)),
      due_now: counts.due_now,
      introduced_today: counts.new_introduced,
      reviews_today: counts.reviews_done,
    )
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
    history: read(history_key, histories_decoder())
      |> option.lazy_unwrap(adopt_history),
    // ^ adoption writes `.v2` as it goes; see `adopt_history`.
    log: read(reviews_key, decode.list(log_row_decoder()))
      |> option.unwrap([]),
    queues: read(queues_key, wire.queues_decoder()) |> option.unwrap([]),
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
/// The account's knobs, and one set of scheduler settings per track.
///
/// One key rather than a key per track. Two reasons: `clear` and the upgrade
/// path would otherwise have to *enumerate* track names, and a name no longer
/// in the bundle would leave an orphan key nothing ever deletes; and this is
/// read at boot before anything else, so one read beats seven.
pub type Stored {
  Stored(account: wire.AccountSettings, tracks: List(#(String, Settings)))
}

pub fn load_stored() -> Stored {
  read(settings_key, stored_decoder()) |> option.lazy_unwrap(adopt_settings)
}

fn persist_stored(stored: Stored) -> Stored {
  let _ = write_stored(stored)
  stored
}

/// One track's profile: the account's half, and that track's scheduler
/// settings or the defaults where it has none of its own.
pub fn load_settings(track: String) -> wire.Profile {
  let stored = load_stored()
  wire.Profile(
    account: stored.account,
    settings: list.key_find(stored.tracks, track)
      |> result.unwrap(wire.default_settings()),
  )
}

/// Writes one track's settings and the account's, leaving every other
/// track's alone.
pub fn save_settings(track: String, profile: wire.Profile) -> Result(Nil, Nil) {
  let stored = load_stored()
  write_stored(
    Stored(account: profile.account, tracks: [
      #(track, profile.settings),
      ..list.filter(stored.tracks, fn(entry) { entry.0 != track })
    ]),
  )
}

fn write_stored(stored: Stored) -> Result(Nil, Nil) {
  write(settings_key, json.to_string(stored_json(stored)))
}

fn stored_json(stored: Stored) -> Json {
  json.object([
    #("account", wire.account_to_json(stored.account)),
    #(
      "tracks",
      json.object(
        list.map(stored.tracks, fn(entry) {
          #(entry.0, wire.settings_to_json(entry.1))
        }),
      ),
    ),
  ])
}

fn stored_decoder() -> Decoder(Stored) {
  use account <- decode.field("account", wire.account_decoder())
  use tracks <- decode.field(
    "tracks",
    decode.dict(decode.string, wire.settings_decoder()),
  )
  decode.success(Stored(account:, tracks: dict.to_list(tracks)))
}

/// The pre-tracks settings blob, split.
///
/// Its per-track half is copied onto every track this browser has anything
/// in -- the exact mirror of what migration 8 does in SQL, and of what an old
/// archive's "" key means. One rule, three places; the wire tests pin that
/// they agree.
fn adopt_settings() -> Stored {
  let account =
    read(legacy_settings_key, wire.account_decoder())
    |> option.unwrap(wire.default_account())
  case read(legacy_settings_key, wire.settings_decoder()) {
    // Nothing to carry over: a browser that has never had settings.
    None -> Stored(account:, tracks: [])
    Some(settings) ->
      Stored(
        account:,
        tracks: list.map(tracks_present(), fn(track) { #(track, settings) }),
      )
      |> persist_stored
  }
}

/// Every track this browser has anything under, read straight from the keys
/// rather than from `Local`: this runs *during* `load`.
fn tracks_present() -> List(String) {
  let refs =
    list.flatten([
      read(cards_key, decode.list(api.card_decoder()))
        |> option.unwrap([])
        |> list.map(fn(card: CardState) { card.problem }),
      read(drafts_key, decode.list(draft_decoder()))
        |> option.unwrap([])
        |> list.map(fn(entry) { entry.0 }),
      read(notes_key, decode.list(draft_decoder()))
        |> option.unwrap([])
        |> list.map(fn(entry) { entry.0 }),
    ])
  refs
  |> list.map(fn(ref: ProblemRef) { ref.category })
  |> list.append(
    read(queues_key, wire.queues_decoder())
    |> option.unwrap([])
    |> list.map(fn(queue: wire.Queue) { queue.track }),
  )
  |> list.filter(fn(track) { track != "" })
  |> list.unique
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

pub fn save_queues(local: Local) -> Result(Nil, Nil) {
  write(queues_key, json.to_string(wire.queues_to_json(local.queues)))
}

pub fn save_history(local: Local) -> Result(Nil, Nil) {
  case write(history_key, json.to_string(histories_json(local.history))) {
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
          queues_key,
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

/// Every track's rollups, as one object keyed by track.
fn histories_json(histories: List(#(String, History))) -> Json {
  json.object(
    list.map(histories, fn(entry) { #(entry.0, history_json(entry.1)) }),
  )
}

fn histories_decoder() -> Decoder(List(#(String, History))) {
  decode.dict(decode.string, history_decoder())
  |> decode.map(dict.to_list)
}

/// The pre-tracks rollups, split across the tracks they belong to.
///
/// Rebuilt by replaying the review log, which carries the track on every row.
/// Be honest about what that costs: the log is a ring buffer of the last two
/// thousand reviews, so a guest past that loses the excess from their
/// *lifetime* counters. Nothing else moves -- no card, no schedule, no draft,
/// no note, no queue -- and the 365-day heatmap the screen actually draws is
/// well inside the ring. The alternative, attributing every old review to one
/// track, would be wrong rather than merely incomplete.
fn adopt_history() -> List(#(String, History)) {
  case read(legacy_history_key, history_decoder()) {
    None -> []
    Some(_) -> {
      // Persisted the moment it is worked out, not left to the next review to
      // write. The log is a ring: as new reviews push old ones off the end, a
      // replay done later would yield *smaller* numbers than one done now, so
      // re-deriving on every boot would quietly walk a guest's lifetime
      // counters down. One write, once, like the key rename at boot.
      let account =
        read(legacy_settings_key, wire.account_decoder())
        |> option.unwrap(wire.default_account())
      read(reviews_key, decode.list(log_row_decoder()))
      |> option.unwrap([])
      |> list.reverse
      |> list.fold([], fn(histories, entry) {
        let #(problem, row) = entry
        let track = problem.category
        let day =
          browser.study_day_index_at(
            float.round(fsrs.to_epoch(row.at)),
            account.day_start_hour,
          )
        let tallied =
          tally(
            list.key_find(histories, track) |> result.unwrap(empty_history()),
            day,
            row.rating != fsrs.Again,
            row.state_before == api.state_code(fsrs.Review),
          )
        [#(track, tallied), ..list.filter(histories, fn(e) { e.0 != track })]
      })
      |> persist_history
    }
  }
}

fn persist_history(
  histories: List(#(String, History)),
) -> List(#(String, History)) {
  // A failed write is not worth failing a boot over: the numbers are right in
  // memory either way, and `storage_full` is already surfaced elsewhere.
  let _ = write(history_key, json.to_string(histories_json(histories)))
  histories
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

/// The study day is a fact about the person, not about what they study, so
/// this takes the account-wide knobs rather than a track's scheduler.
pub fn current_day(account: wire.AccountSettings) -> StudyDay {
  StudyDay(
    start: browser.study_day_start(account.day_start_hour),
    index: browser.study_day_index(account.day_start_hour),
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
pub fn insights(local: Local, track: String) -> api.Insights {
  let chronological =
    local.log
    |> list.filter(fn(entry) { { entry.0 }.category == track })
    |> list.reverse

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
