//// The guest store's arithmetic: scheduling, rollups and the derived
//// views, every one a pure function over the loaded `Local` state.
////
//// Carved out of `local.gleam`, which keeps the localStorage IO. The split
//// is the point: everything here runs under `gleam test` with no
//// `localStorage` at all, and `store.gleam` is the only module that pairs
//// these functions with the reads and writes.
////
//// The scheduling itself is not reimplemented. `fsrs.review` is the same
//// module the server calls, so a guest and an account given the same answers
//// at the same times produce identical cards. What is reimplemented is the
//// bookkeeping the server does in SQL: the study-day boundary, the daily
//// budget, and the statistics rollups.

import fsrs
import gleam/dict.{type Dict}
import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/order
import gleam/result
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/browser
import gleamdrill/model
import gleamdrill/problem.{type ProblemRef}
import wire.{type CardState, type Settings}

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
    log: List(#(ProblemRef, wire.ReviewRow)),
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

pub fn empty_history() -> History {
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
/// Mirrors `server/src/server/study/reviews.gleam:record_review` deliberately: the
/// rating is scheduled as given and the log keeps the run/reveal truth. The
/// rule staying identical is what lets a guest upgrade without their history
/// changing meaning.
pub fn record(
  local: Local,
  settings: Settings,
  review: wire.Review,
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
      state_before: wire.state_code(before.state),
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
              row.state_before == wire.state_code(fsrs.Review),
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

pub fn tally(
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
/// file already has a row per track. Mirrors `archive.archive_tracks` on the
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
          row.state_before == wire.state_code(fsrs.Review),
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
) -> Result(#(Local, wire.CardState), Nil) {
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
/// Mirrors `cards.enqueue_cards` on the server, including that.
pub fn enqueue(
  local: Local,
  problems: List(problem.ProblemRef),
  now: Timestamp,
) -> #(Local, List(wire.CardState)) {
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
) -> wire.Today {
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
) -> wire.Stats {
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
          problem.category == track && wire.state_code(state.card.state) == code
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
/// not sat down yet. Same rule as `server/src/server/study/stats.gleam:streak`.
pub fn streak(history: List(wire.DayTally)) -> Int {
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

/// Answered cards, not queued ones. Queueing a topic is a click and can be
/// redone in another click; a card with reviews behind it is the thing that
/// cannot be rebuilt, and it is what the warning is about.
/// Whole-account, deliberately: the warning is that everything in this
/// browser is at risk, and that is not a per-track fact. A day studied in any
/// track is a day studied.
pub fn worth_warning_about(local: Local, today_index: Int) -> Bool {
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

/// The pre-account localStorage format folded into a guest store.
///
/// Solved problems become review cards seeded from what a `Good` first answer
/// earns -- the same seed the server uses for this migration, and for the same
/// reason: the old format stored a sticky boolean and no dates at all, so
/// there is no real schedule to recover, only a starting point.
///
/// Anything already in the store wins, so this can never overwrite a card the
/// guest has actually drilled. `local.seed_from_legacy` loads, calls this and
/// saves; the fold itself lives here so a test can pin it.
pub fn seed(
  store: Local,
  solved: List(ProblemRef),
  drafts: List(#(ProblemRef, String)),
  now: Timestamp,
) -> Local {
  let settings = wire.default_settings()
  let memory = fsrs.initial_memory(settings.scheduler, fsrs.Good)

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
                memory: Some(memory),
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

  list.fold(drafts, Local(..store, cards:), fn(acc, entry) {
    case model.assoc_get(acc.drafts, entry.0) {
      Ok(_) -> acc
      Error(Nil) -> put_draft(acc, entry.0, entry.1)
    }
  })
}

// --- the insight payloads, guest edition -----------------------------------

/// The wire shape `/api/insights` produces, computed from the local log so
/// `insights.analyse` cannot tell a guest from an account.
pub fn insights(local: Local, track: String) -> wire.Insights {
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
    list.fold(clean, dict.new(), fn(acc, solve: wire.CleanSolve) {
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
  chronological: List(#(ProblemRef, wire.ReviewRow)),
) -> List(wire.Calibration) {
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
pub fn history_of(local: Local, problem: ProblemRef) -> List(wire.ReviewRow) {
  local.log
  |> list.filter_map(fn(entry) {
    case entry.0 == problem {
      True -> Ok(entry.1)
      False -> Error(Nil)
    }
  })
  |> list.reverse
}
