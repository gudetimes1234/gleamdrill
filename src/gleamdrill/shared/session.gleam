//// Accounts and the boot state: the sign-in form, sessions, the guest
//// merge, sign-out, device preferences and the scheduler settings.

import gleam/dict
import gleam/list
import gleam/option.{type Option, None, Some}
import gleamdrill/model.{
  type Model, type Route, Account, Guest, MenuRoute, Model, PromptDismissed,
  QueueRoute, SettingsRoute, StatsRoute, StudyRoute, SyncFailed, Synced, Syncing,
  TourRoute, TracksRoute,
}
import gleamdrill/msg.{type Msg, SignOutCompleted, StateImported}
import gleamdrill/shared/common
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import lustre/effect.{type Effect}
import wire

/// What signing in does to the shared state. Straight back to the study
/// screen, which stays up while the account's state loads behind the sync
/// bar: signing in is not a reboot.
///
/// Whatever this browser held as a guest goes up first on a brand-new
/// account, and the state is loaded once it has landed (StateImported), so
/// the state that comes back already includes it. Signing in to an existing
/// account offers the merge instead (`UserClickedMergeGuest`): folding
/// scratch progress into an established account unasked would surprise.
pub fn signed_in(
  m: Model,
  session: wire.Session,
  registered: Bool,
) -> #(Model, Effect(Msg)) {
  let signed_in =
    Model(
      ..m,
      mode: Account(session.token),
      user: Some(session.user),
      refreshing: True,
      route: StudyRoute,
    )
  let upgrading = registered && common.guest_has_progress()
  #(
    Model(..signed_in, merge_offer: !upgrading && common.guest_has_progress()),
    effect.batch([
      store.save_token(session.token),
      case upgrading {
        True -> store.upgrade(session.token, [], StateImported)
        False -> store.load_state(signed_in, msg.StateLoaded)
      },
    ]),
  )
}

pub fn state_loaded(
  m: Model,
  result: Result(wire.BootState, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(state) -> {
      let loaded = apply_state(m, state)
      // The server answers a bare request with the track holding the most
      // cards, so an account that has been used on another device lands where
      // it left off rather than on the switcher. Remember that here.
      let remembered = case loaded.active_track != m.active_track {
        True -> common.save_preferences(loaded)
        False -> effect.none()
      }
      // Guest progress left in this browser is offered on every account
      // load, not only the sign-in that stranded it.
      let loaded = case loaded.mode {
        Account(_) -> Model(..loaded, merge_offer: common.guest_has_progress())
        Guest -> loaded
      }
      // The dashboard reports a streak and an estimate of how long today's
      // queue will take, both of which need the stats and insights payloads.
      // Fetched after the screen is already up rather than before it, so a
      // slow round trip delays a tile and not the first paint.
      let dashboard =
        effect.batch([
          store.load_stats(loaded, msg.StatsLoaded),
          store.load_insights(loaded, msg.InsightsLoaded),
        ])
      let loaded =
        Model(
          ..loaded,
          stats: remote.reload(loaded.stats),
          insights: remote.reload(loaded.insights),
        )
      case m.mode, store.legacy_pending() {
        // A guest adopts the pre-account blob locally at boot instead; there
        // is nothing to send anywhere.
        Guest, _ | _, None -> #(loaded, effect.batch([dashboard, remembered]))
        Account(token), Some(old) ->
          case store.legacy_is_empty(old) {
            True -> #(
              loaded,
              effect.batch([dashboard, remembered, store.mark_legacy_imported()]),
            )
            False -> #(
              loaded,
              effect.batch([
                dashboard,
                remembered,
                store.import_legacy(token, old, StateImported),
                store.mark_legacy_imported(),
              ]),
            )
          }
      }
    }
    Error(remote.Unauthorised) -> {
      let guest =
        Model(
          ..model.default(),
          editor_keymap: m.editor_keymap,
          editor_height: m.editor_height,
          prompt_open: m.prompt_open,
          // An expired session drops you to guest; it does not un-ask which
          // track this browser is on.
          active_track: m.active_track,
          active_queue: m.active_queue,
          // Mid-session this is a refresh, not a reboot: whatever was on
          // screen stays there. At boot the loading card stays up.
          boot: m.boot,
          refreshing: True,
        )
      #(
        guest,
        effect.batch([
          store.clear_token(),
          store.load_state(guest, msg.StateLoaded),
        ]),
      )
    }
    Error(failure) ->
      case m.boot {
        Synced -> #(
          Model(
            ..m,
            refreshing: False,
            notice: Some(
              "Couldn't refresh from the server: "
              <> remote.error_message(failure),
            ),
          ),
          effect.none(),
        )
        _ -> #(
          Model(..m, boot: SyncFailed(remote.error_message(failure))),
          effect.none(),
        )
      }
  }
}

pub fn retry_sync(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, boot: Syncing), store.load_state(m, msg.StateLoaded))
}

pub fn state_imported(
  m: Model,
  result: Result(Nil, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(Nil) -> #(
      Model(..m, merge_offer: False, refreshing: True),
      effect.batch([store.clear_guest(), store.load_state(m, msg.StateLoaded)]),
    )
    Error(failure) -> #(
      Model(
        ..m,
        refreshing: False,
        merge_offer: True,
        notice: Some(
          "Your progress could not be moved to this account: "
          <> remote.error_message(failure)
          <> " It is still in this browser \u{2014} use Merge it to try again.",
        ),
      ),
      effect.none(),
    )
  }
}

pub fn merge_guest(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, merge_offer: False, refreshing: True),
    store.upgrade(common.token(m), [], StateImported),
  )
}

pub fn dismiss_merge_offer(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, merge_offer: False), effect.none())
}

pub fn sign_out(m: Model) -> #(Model, Effect(Msg)) {
  {
    let signed_out =
      Model(
        ..model.default(),
        editor_keymap: m.editor_keymap,
        editor_height: m.editor_height,
        prompt_open: m.prompt_open,
        // Signing out is not a factory reset of this browser. Without this
        // it sends someone who has already chosen a track back to the
        // switcher.
        active_track: m.active_track,
        active_queue: m.active_queue,
        tour_lesson: m.tour_lesson,
        boot: Syncing,
      )
    #(
      signed_out,
      effect.batch([
        store.log_out(common.token(m), SignOutCompleted),
        store.clear_token(),
        // Back to guest rather than to a sign-in wall. The guest store was
        // cleared on upgrade, so this loads empty.
        store.load_state(signed_out, msg.StateLoaded),
      ]),
    )
  }
}

pub fn dismiss_upgrade_prompt(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, upgrade_prompt: PromptDismissed), store.dismiss_upgrade_prompt())
}

/// Seeds the guest store from the pre-account localStorage format, once.
///
/// Solved problems become review cards with the memory state a `Good` first
/// answer earns -- the same seed the server uses for this migration, because
/// the old format recorded a sticky boolean and no dates at all.
pub fn adopt_legacy() -> Effect(Msg) {
  case store.legacy_pending() {
    None -> effect.none()
    Some(old) ->
      case store.legacy_is_empty(old) {
        True -> store.mark_legacy_imported()
        False -> store.adopt_legacy_locally(old)
      }
  }
}

/// Folds a fresh `/api/state` into the model.
fn apply_state(m: Model, state: wire.BootState) -> Model {
  Model(
    ..m,
    user: Some(state.user),
    boot: Synced,
    refreshing: False,
    now: state.now,
    settings: state.settings,
    account: state.account,
    active_track: state.track,
    tracks: state.tracks,
    cards: dict.from_list(
      list.map(state.cards, fn(card) { #(card.problem, card) }),
    ),
    today: state.today,
    drafts: state.drafts,
    notes: state.notes,
    queues: state.queues,
    // A device remembers which queue it studies; the list may have gone
    // on another device, in which case today is everything again.
    active_queue: known_queue(state.queues, m.active_queue),
    route: landing(m.route, state.track),
    // Evaluated on every load, not only after a review: a guest who crossed
    // the threshold in a previous session should still be told.
    upgrade_prompt: common.escalate(m),
  )
}

/// The one place that decides where a load lands. A browser with no track
/// lands on the switcher, because Study, Queue and Stats are all inside a
/// track and there is nothing honest to show without one. The server names
/// the track holding the most cards when the request does not, so an account
/// used on another device lands where it left off rather than being asked
/// again.
///
/// Otherwise the screen stays put when it is one a URL can name, so a deep
/// link or a reload survives the load. Signing in, and a sitting caught by a
/// reload of its track, land on the study screen: what to study today is the
/// question the app answers first.
fn landing(route: Route, track: String) -> Route {
  case track, route {
    "", _ -> TracksRoute
    _, TracksRoute
    | _, SettingsRoute
    | _, TourRoute
    | _, StudyRoute
    | _, MenuRoute
    | _, QueueRoute
    | _, StatsRoute
    -> route
    _, _ -> StudyRoute
  }
}

fn known_queue(
  queues: List(wire.Queue),
  name: Option(String),
) -> Option(String) {
  case name {
    Some(n) ->
      case list.any(queues, fn(queue) { queue.name == n }) {
        True -> name
        False -> None
      }
    None -> None
  }
}

pub fn sign_out_completed(m: Model) -> #(Model, Effect(Msg)) {
  #(m, effect.none())
}

pub fn dismiss_notice(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, notice: None), effect.none())
}
