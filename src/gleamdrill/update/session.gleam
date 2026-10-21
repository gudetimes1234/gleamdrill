//// Accounts and the boot state: the sign-in form, sessions, the guest
//// merge, sign-out, device preferences and the scheduler settings.

import fsrs
import gleam/dict
import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleamdrill/model.{
  type Model, Account, AuthForm, AuthRoute, DayStartHour, DesiredRetention,
  Guest, Model, NewPerDay, PromptDismissed, Registering, ReminderHour,
  ReviewsPerDay, SigningIn, StudyRoute, SyncFailed, Synced, Syncing, TracksRoute,
}
import gleamdrill/msg.{type Msg, AuthCompleted, SignOutCompleted, StateImported}
import gleamdrill/platform/browser
import gleamdrill/store
import gleamdrill/store/remote.{type ApiError}
import gleamdrill/update/common
import lustre/effect.{type Effect}
import wire

pub fn auth_email(m: Model, value: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, auth: AuthForm(..m.auth, email: value, error: None)),
    effect.none(),
  )
}

pub fn auth_password(m: Model, value: String) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, auth: AuthForm(..m.auth, password: value, error: None)),
    effect.none(),
  )
}

pub fn toggle_auth_mode(m: Model) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      auth: AuthForm(
        ..m.auth,
        mode: case m.auth.mode {
          SigningIn -> Registering
          Registering -> SigningIn
        },
        error: None,
      ),
    ),
    effect.none(),
  )
}

pub fn submit_auth(m: Model) -> #(Model, Effect(Msg)) {
  case m.auth.busy, m.auth.email, m.auth.password {
    // Ignore a second submit while one is already in flight, so a double
    // click cannot create two accounts.
    True, _, _ -> #(m, effect.none())
    False, "", _ | False, _, "" -> #(
      Model(
        ..m,
        auth: AuthForm(..m.auth, error: Some("Enter an email and a password.")),
      ),
      effect.none(),
    )
    False, email, password -> #(
      Model(..m, auth: AuthForm(..m.auth, busy: True, error: None)),
      case m.auth.mode {
        SigningIn -> store.login(email, password, AuthCompleted)
        Registering -> store.signup(email, password, AuthCompleted)
      },
    )
  }
}

pub fn auth_completed(
  m: Model,
  result: Result(wire.Session, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(session) -> {
      // Straight back to the study screen, which stays on screen while the
      // account's state loads behind the sync bar: signing in is not a
      // reboot, and the loading card is for the one load before anything
      // exists to show.
      let signed_in =
        Model(
          ..m,
          mode: Account(session.token),
          user: Some(session.user),
          refreshing: True,
          route: StudyRoute,
          // The password leaves the model the moment it is no longer needed.
          auth: AuthForm(..m.auth, password: "", busy: False, error: None),
        )

      // Whatever this browser was holding as a guest goes up first, and the
      // state is loaded once it has landed (StateImported), so the state that
      // comes back already includes it -- in sequence, not in a race. On a
      // brand new account there is nothing to lose by merging; signing in to
      // an existing one is handled by `UserClickedMergeGuest`, because
      // folding scratch progress into an established account unasked would
      // be surprising.
      let upgrading = m.auth.mode == Registering && common.guest_has_progress()

      #(
        Model(
          ..signed_in,
          merge_offer: !upgrading && common.guest_has_progress(),
        ),
        effect.batch([
          store.save_token(session.token),
          case upgrading {
            True -> store.upgrade(session.token, [], StateImported)
            False -> store.load_state(signed_in)
          },
        ]),
      )
    }
    Error(failure) -> #(
      Model(
        ..m,
        auth: AuthForm(
          ..m.auth,
          busy: False,
          error: Some(remote.error_message(failure)),
        ),
      ),
      effect.none(),
    )
  }
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
        effect.batch([store.load_stats(loaded), store.load_insights(loaded)])
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
      #(guest, effect.batch([store.clear_token(), store.load_state(guest)]))
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
  #(Model(..m, boot: Syncing), store.load_state(m))
}

pub fn state_imported(
  m: Model,
  result: Result(Nil, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(Nil) -> #(
      Model(..m, merge_offer: False, refreshing: True),
      effect.batch([store.clear_guest(), store.load_state(m)]),
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
        store.load_state(signed_out),
      ]),
    )
  }
}

pub fn dismiss_upgrade_prompt(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, upgrade_prompt: PromptDismissed), store.dismiss_upgrade_prompt())
}

pub fn sign_in(m: Model, mode: model.AuthMode) -> #(Model, Effect(Msg)) {
  #(
    Model(
      ..m,
      route: AuthRoute,
      auth: AuthForm(..m.auth, mode:, error: None, busy: False),
    ),
    effect.none(),
  )
}

pub fn changed_setting(
  m: Model,
  field: model.SettingField,
  raw: String,
) -> #(Model, Effect(Msg)) {
  {
    let profile = apply_setting(wire.Profile(m.account, m.settings), field, raw)
    let m = Model(..m, settings: profile.settings, account: profile.account)
    #(m, store.save_settings(m, profile))
  }
}

pub fn device_timezone(m: Model) -> #(Model, Effect(Msg)) {
  {
    let account =
      wire.AccountSettings(..m.account, timezone: browser.time_zone())
    let m = Model(..m, account:)
    #(m, store.save_settings(m, wire.Profile(account, m.settings)))
  }
}

pub fn settings_saved(
  m: Model,
  result: Result(wire.Profile, ApiError),
) -> #(Model, Effect(Msg)) {
  case result {
    Ok(profile) -> #(
      Model(..m, settings: profile.settings, account: profile.account),
      effect.none(),
    )
    Error(error) -> #(
      Model(..m, notice: Some(remote.error_message(error))),
      effect.none(),
    )
  }
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
///
/// Note the route: a signed-in user lands on the study screen, not the manual
/// browser. The browser is still there, but what to study today is the
/// question the app now answers first.
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
    queue_editing: known_queue(state.queues, m.queue_editing),
    // The one place that decides where boot lands. A browser with no track
    // lands on the switcher, because Study, Queue and Stats are all inside a
    // track and there is nothing honest to show without one. The server names
    // the track holding the most cards when the request does not, so an
    // account used on another device lands where it left off rather than
    // being asked again.
    route: case state.track {
      "" -> TracksRoute
      _ -> StudyRoute
    },
    // Evaluated on every load, not only after a review: a guest who crossed
    // the threshold in a previous session should still be told.
    upgrade_prompt: common.escalate(m),
  )
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

/// Parse one settings input and clamp it into range.
///
/// The bounds mirror `validate.settings` in the server's study/validate.gleam.
/// Clamping rather than rejecting is deliberate: these come from a number
/// input whose own min/max the browser already shows, so a value outside them
/// is a typo, and snapping it is friendlier than an error. Unparseable text
/// leaves the setting alone.
fn apply_setting(
  profile: wire.Profile,
  field: model.SettingField,
  raw: String,
) -> wire.Profile {
  let wire.Profile(account:, settings:) = profile
  // Which half of the profile the field belongs to. Splitting them is the
  // whole point of the record split: a daily budget is about what you are
  // studying, a rollover hour is about you.
  let tuned = fn(settings) { wire.Profile(account:, settings:) }
  let personal = fn(account) { wire.Profile(account:, settings:) }
  case field {
    NewPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          tuned(
            wire.Settings(..settings, new_per_day: int.clamp(value, 0, 100)),
          )
        Error(Nil) -> profile
      }
    ReviewsPerDay ->
      case int.parse(raw) {
        Ok(value) ->
          tuned(
            wire.Settings(..settings, reviews_per_day: int.clamp(value, 0, 500)),
          )
        Error(Nil) -> profile
      }
    DayStartHour ->
      case int.parse(raw) {
        Ok(value) ->
          personal(
            wire.AccountSettings(
              ..account,
              day_start_hour: int.clamp(value, 0, 23),
            ),
          )
        Error(Nil) -> profile
      }
    ReminderHour ->
      case int.parse(raw) {
        Ok(hour) ->
          personal(
            wire.AccountSettings(
              ..account,
              reminder_hour: Some(int.clamp(hour, 0, 23)),
            ),
          )
        // The select's "off" option, or anything else: no mail.
        Error(Nil) ->
          personal(wire.AccountSettings(..account, reminder_hour: None))
      }
    DesiredRetention -> {
      let retained = fn(value) {
        tuned(
          wire.Settings(
            ..settings,
            scheduler: fsrs.Config(
              ..settings.scheduler,
              desired_retention: float.clamp(value, 0.7, 0.99),
            ),
          ),
        )
      }
      case float.parse(raw) {
        Ok(value) -> retained(value)
        // An integer in a step-0.01 field: "1" should mean 1.0, not nothing.
        Error(Nil) ->
          case int.parse(raw) {
            Ok(whole) -> retained(int.to_float(whole))
            Error(Nil) -> profile
          }
      }
    }
  }
}

pub fn sign_out_completed(m: Model) -> #(Model, Effect(Msg)) {
  #(m, effect.none())
}

pub fn dismiss_notice(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, notice: None), effect.none())
}

pub fn open_settings(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, route: model.SettingsRoute), common.measure_cache())
}
