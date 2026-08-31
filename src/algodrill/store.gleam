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

import algodrill/api
import algodrill/browser
import algodrill/local
import algodrill/model.{
  type Model, type Msg, Account, CardSuspended, DraftSynced, Guest,
  HistoryLoaded, InsightsLoaded, ReviewRecorded, StateLoaded, StatsLoaded,
}
import algodrill/problem.{type ProblemRef}
import gleam/dict
import gleam/int
import gleam/time/timestamp
import lustre/effect.{type Effect}
import wire

pub fn load_state(m: Model) -> Effect(Msg) {
  case m.mode {
    Account(token) -> api.fetch_state(base(), token, StateLoaded)
    Guest -> {
      use dispatch <- effect.from
      let store = local.load()
      let settings = api.default_settings()
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
      // a failure in either means progress is not being kept.
      let saved = case local.save_cards(updated), local.save_history(updated) {
        Ok(Nil), Ok(Nil) -> Ok(Nil)
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
