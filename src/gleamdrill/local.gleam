//// Guest mode's storage: the localStorage reads and writes, and the JSON
//// codecs for what is kept there. The arithmetic over the loaded state lives
//// in `guest.gleam`; only `store.gleam` imports this.
////
//// This is a second store, not a cache. A guest's cards live only here; a
//// signed-in user's live only on the server. There is a one-way migration
//// between them and no sync in either direction, which is exactly why nothing
//// in this file has to resolve a conflict.

import fsrs
import gleam/dict
import gleam/dynamic/decode.{type Decoder}
import gleam/float
import gleam/json.{type Json}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/time/timestamp
import gleamdrill/browser
import gleamdrill/guest.{type History, type Local, DayTally, History, Local}
import gleamdrill/model
import gleamdrill/problem.{type ProblemRef}
import plinth/javascript/storage
import wire.{type CardState, type Settings}

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

/// Whether the stronger upgrade prompt is owed, reading both the thresholds
/// and the shown-once flag.
///
/// One place decides this, so the prompt behaves the same whether it is
/// evaluated on load or straight after a review. Without the load path a
/// returning guest with fifty cards would never see it, having crossed the
/// threshold in an earlier session.
pub fn prompt_state(day: guest.StudyDay) -> model.UpgradePrompt {
  case prompt_dismissed() {
    True -> model.PromptDismissed
    False ->
      case guest.worth_warning_about(load(), day.index) {
        True -> model.PromptShowing
        False -> model.PromptUnseen
      }
  }
}

// --- storage ---------------------------------------------------------------

pub fn load() -> Local {
  Local(
    cards: read(cards_key, decode.list(wire.card_decoder()))
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
  !guest.is_empty(load())
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
      read(cards_key, decode.list(wire.card_decoder()))
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
    json.to_string(json.array(dict.values(local.cards), wire.card_to_json)),
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
          guest.tally(
            list.key_find(histories, track)
              |> result.unwrap(guest.empty_history()),
            day,
            row.rating != fsrs.Again,
            row.state_before == wire.state_code(fsrs.Review),
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

/// The study day is a fact about the person, not about what they study, so
/// this takes the account-wide knobs rather than a track's scheduler.
pub fn current_day(account: wire.AccountSettings) -> guest.StudyDay {
  guest.StudyDay(
    start: browser.study_day_start(account.day_start_hour),
    index: browser.study_day_index(account.day_start_hour),
  )
}

/// Folds the pre-account localStorage format into the guest store, once.
/// The fold itself is `guest.seed`; this is the load and the two writes.
pub fn seed_from_legacy(
  solved: List(ProblemRef),
  drafts: List(#(ProblemRef, String)),
) -> Nil {
  let seeded = guest.seed(load(), solved, drafts, timestamp.system_time())
  let _ = save_cards(seeded)
  let _ = save_drafts(seeded)
  Nil
}

fn log_row_json(entry: #(ProblemRef, wire.ReviewRow)) -> Json {
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

fn log_row_decoder() -> Decoder(#(ProblemRef, wire.ReviewRow)) {
  use category <- decode.field("category", decode.string)
  use subcategory <- decode.field("subcategory", decode.string)
  use title <- decode.field("title", decode.string)
  use row <- decode.then(wire.review_row_decoder())
  decode.success(#(wire.ProblemRef(category:, subcategory:, title:), row))
}
