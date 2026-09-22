//// Where study data goes: the server when signed in, this browser when not.
////
//// Every function here dispatches on `Model.mode` and produces **the same
//// message either way**. That is the whole design: the update loop already
//// knows how to handle `StateLoaded(Result(BootState, _))` and
//// `ReviewRecorded(Result(ReviewOutcome, _))`, so guest mode needed no new
//// message, no new model field, and no change to any view's shape -- only a
//// different effect behind the same four calls.
////
//// Guest effects are synchronous but still dispatch, because a caller that
//// sometimes returns a value and sometimes a message would put the branch
//// back in the update loop, which is what this module exists to remove.

import gleam/dict
import gleam/int
import gleam/result
import gleam/time/timestamp
import gleamdrill/api
import gleamdrill/browser
import gleamdrill/local
import gleamdrill/model.{
  type Model, type Msg, type UndoPoint, Account, ArchiveReady, ArchiveRestored,
  CardSuspended, DraftSynced, Guest, HistoryLoaded, InsightsLoaded, NoteSynced,
  QueueChanged, QueuesSaved, ReviewRecorded, SettingsSaved, StateLoaded,
  StatsLoaded, UndoRecorded,
}
import gleamdrill/problem.{type ProblemRef}
import lustre/effect.{type Effect}
import wire

pub fn load_state(m: Model) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.fetch_state(base(), token, StateLoaded)
    Guest -> {
      use dispatch <- effect.from
      let store = local.load()
      // Read, not defaulted. This line used to hardcode the defaults, so a
      // guest's settings survived exactly until the next page load.
      let settings = local.load_settings()
      let now = timestamp.system_time()
      let day = local.current_day(settings)
      dispatch(
        StateLoaded(
          Ok(wire.BootState(
            now:,
            // A guest has no account, so there is no email to show. The view
            // branches on `mode`, not on this.
            user: wire.User(id: "", email: ""),
            settings:,
            cards: dict.values(store.cards),
            drafts: store.drafts,
            notes: store.notes,
            queues: store.queues,
            today: local.today(store, settings, now, day),
          )),
        ),
      )
    }
  }
}

pub fn record_review(m: Model, review: api.Review) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.post_review(base(), token, review, ReviewRecorded)
    Guest -> {
      use dispatch <- effect.from
      // The device clock, not a server's. A guest who changes their system
      // time shifts their own due dates; Anki behaves the same way locally.
      let now = timestamp.system_time()
      let day = local.current_day(m.settings)
      let store = local.load()

      let #(updated, card) =
        local.record(store, m.settings, review, now, day.index, fuzz_sample())

      // Cards and history change together on a review, so both are written;
      // a failure in either means progress is not being kept. The drafts
      // are written too, since the review just dropped this problem's.
      let saved = case local.save_cards(updated), local.save_history(updated) {
        Ok(Nil), Ok(Nil) -> {
          let _ = local.save_drafts(updated)
          Ok(Nil)
        }
        _, _ -> Error(Nil)
      }

      dispatch(case saved {
        Error(Nil) -> ReviewRecorded(Error(storage_full()))
        Ok(Nil) ->
          ReviewRecorded(
            Ok(wire.ReviewOutcome(
              now:,
              card:,
              today: local.today(updated, m.settings, now, day),
            )),
          )
      })
    }
  }
}

/// Everything the user has, as one archive: fetched from the server, or
/// assembled from the guest store.
pub fn export_archive(m: Model) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.fetch_export(base(), token, ArchiveReady)
    Guest -> {
      use dispatch <- effect.from
      dispatch(
        ArchiveReady(
          Ok(local.archive(
            local.load(),
            local.load_settings(),
            timestamp.system_time(),
          )),
        ),
      )
    }
  }
}

/// Replaces everything the user has with an archive. The caller reloads
/// the boot state afterwards; nothing here touches the model.
pub fn restore_archive(m: Model, archive: api.Archive) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.post_restore(base(), token, archive, ArchiveRestored)
    Guest -> {
      use dispatch <- effect.from
      dispatch(
        ArchiveRestored(
          case local.save_all(local.restore(archive), archive.settings) {
            Ok(Nil) -> Ok(Nil)
            Error(Nil) -> Error(storage_full())
          },
        ),
      )
    }
  }
}

/// Takes back the most recent review. Signed in, the server restores the
/// card from the snapshot it kept; a guest is restored from the snapshot
/// the model kept, and the log loses its newest row.
pub fn undo_review(m: Model, point: UndoPoint) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.delete_review(base(), token, UndoRecorded(point, _))
    Guest -> {
      use dispatch <- effect.from
      let now = timestamp.system_time()
      let day = local.current_day(m.settings)
      let store = local.load()
      let result = {
        use updated <- result.try(
          local.unrecord(store, point.problem, point.card_before, day.index)
          |> result.replace_error(api.Rejected(
            "The latest review is not the one to undo.",
          )),
        )
        case local.save_cards(updated), local.save_history(updated) {
          Ok(Nil), Ok(Nil) ->
            Ok(wire.UndoOutcome(
              now:,
              card: point.card_before,
              today: local.today(updated, m.settings, now, day),
            ))
          _, _ -> Error(storage_full())
        }
      }
      dispatch(UndoRecorded(point, result))
    }
  }
}

/// Parks or resumes one card, producing the same {now, card, today} fold a
/// review does. Guest failures surface like any other failed write.
pub fn set_suspended(
  m: Model,
  problem: ProblemRef,
  suspended: Bool,
) -> Effect(Msg) {
  case m.mode {
    Account(token) ->
      api.patch_card(base(), token, problem, suspended, CardSuspended)
    Guest -> {
      use dispatch <- effect.from
      let now = timestamp.system_time()
      let day = local.current_day(m.settings)
      let store = local.load()
      dispatch(case local.set_suspended(store, problem, suspended) {
        Error(Nil) ->
          CardSuspended(
            Error(api.Rejected("That problem has no scheduled card to suspend.")),
          )
        Ok(#(updated, card)) ->
          case local.save_cards(updated) {
            Error(Nil) -> CardSuspended(Error(storage_full()))
            Ok(Nil) ->
              CardSuspended(
                Ok(wire.ReviewOutcome(
                  now:,
                  card:,
                  today: local.today(updated, m.settings, now, day),
                )),
              )
          }
      })
    }
  }
}

/// Puts problems into the study queue, or takes them out.
///
/// Both produce the same `QueueChanged` fold whichever store is behind them,
/// and both are bulk: adding a topic is one call, so a half-applied selection
/// is not a state the update loop has to think about.
pub fn add_to_queue(m: Model, problems: List(ProblemRef)) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.post_cards(base(), token, problems, QueueChanged)
    Guest -> {
      use dispatch <- effect.from
      let now = timestamp.system_time()
      let day = local.current_day(m.settings)
      let #(updated, cards) = local.enqueue(local.load(), problems, now)
      dispatch(case local.save_cards(updated) {
        Error(Nil) -> QueueChanged(Error(storage_full()))
        Ok(Nil) ->
          QueueChanged(
            Ok(wire.QueueChange(
              now:,
              cards:,
              removed: [],
              refused: [],
              today: local.today(updated, m.settings, now, day),
            )),
          )
      })
    }
  }
}

pub fn remove_from_queue(m: Model, problems: List(ProblemRef)) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.delete_cards(base(), token, problems, QueueChanged)
    Guest -> {
      use dispatch <- effect.from
      let now = timestamp.system_time()
      let day = local.current_day(m.settings)
      let #(updated, removed, refused) = local.dequeue(local.load(), problems)
      dispatch(case local.save_cards(updated) {
        Error(Nil) -> QueueChanged(Error(storage_full()))
        Ok(Nil) ->
          QueueChanged(
            Ok(wire.QueueChange(
              now:,
              cards: [],
              removed:,
              refused:,
              today: local.today(updated, m.settings, now, day),
            )),
          )
      })
    }
  }
}

/// Drops a draft with no review to hang it on: a Blitz card that ran out
/// of time is a miss, not work in progress.
pub fn delete_draft(m: Model, problem: ProblemRef) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.delete_draft(base(), token, problem, DraftSynced)
    Guest -> {
      use dispatch <- effect.from
      let store = local.load()
      let updated =
        local.Local(..store, drafts: local.drop_draft(store.drafts, problem))
      dispatch(
        DraftSynced(case local.save_drafts(updated) {
          Ok(Nil) -> Ok(Nil)
          Error(_) -> Error(storage_full())
        }),
      )
    }
  }
}

pub fn save_draft(m: Model, problem: ProblemRef, body: String) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.put_draft(base(), token, problem, body, DraftSynced)
    Guest -> {
      use dispatch <- effect.from
      let updated = local.put_draft(local.load(), problem, body)
      dispatch(
        DraftSynced(case local.save_drafts(updated) {
          Ok(Nil) -> Ok(Nil)
          Error(Nil) -> Error(storage_full())
        }),
      )
    }
  }
}

pub fn save_note(m: Model, problem: ProblemRef, body: String) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.put_note(base(), token, problem, body, NoteSynced)
    Guest -> {
      use dispatch <- effect.from
      let updated = local.put_note(local.load(), problem, body)
      dispatch(
        NoteSynced(case local.save_notes(updated) {
          Ok(Nil) -> Ok(Nil)
          Error(Nil) -> Error(storage_full())
        }),
      )
    }
  }
}

/// Persist the named queues, whole: the model owns the list, so the guest
/// branch writes what it is given rather than merging.
pub fn save_queues(m: Model) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.put_queues(base(), token, m.queues, QueuesSaved)
    Guest -> {
      use dispatch <- effect.from
      let updated = local.Local(..local.load(), queues: m.queues)
      dispatch(
        QueuesSaved(case local.save_queues(updated) {
          Ok(Nil) -> Ok(Nil)
          Error(Nil) -> Error(storage_full())
        }),
      )
    }
  }
}

/// Persist the scheduler settings. Same shape as `save_draft`, with one
/// difference worth naming: the server answers with the settings it stored, so
/// the guest branch has to dispatch what it just wrote rather than `Nil`.
pub fn save_settings(m: Model, settings: api.Settings) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.put_settings(base(), token, settings, SettingsSaved)
    Guest -> {
      use dispatch <- effect.from
      dispatch(
        SettingsSaved(case local.save_settings(settings) {
          Ok(Nil) -> Ok(settings)
          Error(Nil) -> Error(storage_full())
        }),
      )
    }
  }
}

pub fn load_insights(m: Model) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.fetch_insights(base(), token, InsightsLoaded)
    Guest -> {
      use dispatch <- effect.from
      dispatch(InsightsLoaded(Ok(local.insights(local.load()))))
    }
  }
}

pub fn load_history(m: Model, problem: ProblemRef) -> Effect(Msg) {
  case m.mode {
    Account(token) ->
      api.fetch_history(base(), token, problem, HistoryLoaded(problem, _))
    Guest -> {
      use dispatch <- effect.from
      dispatch(HistoryLoaded(
        problem,
        Ok(local.history_of(local.load(), problem)),
      ))
    }
  }
}

pub fn load_stats(m: Model) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.fetch_stats(base(), token, StatsLoaded)
    Guest -> {
      use dispatch <- effect.from
      let now = timestamp.system_time()
      dispatch(
        StatsLoaded(
          Ok(local.stats(local.load(), now, local.current_day(m.settings))),
        ),
      )
    }
  }
}

/// Hands whatever this browser holds to a freshly created account, then wipes
/// it so signing out later cannot resurrect a stale copy.
///
/// Legacy pre-account state and guest state go up in the same request: the
/// server keeps whichever card already exists, and guest cards are written
/// first so real scheduling wins over the flat legacy seed.
pub fn upgrade(
  token: String,
  solved: List(ProblemRef),
  handler: fn(Result(Nil, api.ApiError)) -> Msg,
) -> Effect(Msg) {
  let store = local.load()
  api.import_legacy(
    base(),
    token,
    solved,
    dict.values(store.cards),
    store.drafts,
    store.notes,
    store.queues,
    handler,
  )
}

pub fn clear_guest() -> Effect(Msg) {
  use _dispatch <- effect.from
  local.clear()
}

/// The scheduler takes its fuzz sample as an argument so it can stay pure.
/// Signed in, the server draws it from a CSPRNG; here it is `Math.random`,
/// which is ample for scattering review dates.
fn fuzz_sample() -> Float {
  int.to_float(browser.random_int(1_000_000)) /. 1_000_000.0
}

fn storage_full() -> api.ApiError {
  api.Rejected(
    "This browser's storage is full, so your progress was not saved.",
  )
}

fn base() -> String {
  browser.api_base()
}
