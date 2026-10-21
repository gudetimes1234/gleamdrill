//// The application: the shared state, the page on screen, and the dispatch
//// between them.
////
//// Each page under `page/` owns its model, its messages, its update, its
//// view and its keys. The app holds one page at a time, routes each page's
//// messages to it, and applies the `Change`s a page asks for to the shared
//// state. The shared state's own messages (the session, loads, the run
//// engine) go to `shared/update`; `msg.Msg` carries both kinds.

import gleam/dict
import gleam/list
import gleam/option.{None, Some}
import gleam/result
import gleam/uri.{type Uri}
import gleamdrill/domain/guest
import gleamdrill/model.{
  type Route, AuthRoute, CompareRoute, DrillRoute, MenuRoute, QueueRoute,
  ReportRoute, SettingsRoute, StatsRoute, StudyRoute, SummaryRoute, TourRoute,
  TracksRoute,
}
import gleamdrill/msg.{type Msg}
import gleamdrill/page/auth/keys as auth_keys
import gleamdrill/page/auth/model as auth_model
import gleamdrill/page/auth/update as auth_update
import gleamdrill/page/auth/view as auth_view
import gleamdrill/page/browse/compare_view
import gleamdrill/page/browse/keys as browse_keys
import gleamdrill/page/browse/model as browse_model
import gleamdrill/page/browse/update as browse_update
import gleamdrill/page/browse/view as browse_view
import gleamdrill/page/queue/keys as queue_keys
import gleamdrill/page/queue/model as queue_model
import gleamdrill/page/queue/update as queue_update
import gleamdrill/page/queue/view as queue_view
import gleamdrill/page/settings/keys as settings_keys
import gleamdrill/page/settings/model as settings_model
import gleamdrill/page/settings/update as settings_update
import gleamdrill/page/settings/view as settings_view
import gleamdrill/page/sitting/keys as sitting_keys
import gleamdrill/page/sitting/model as sitting_model
import gleamdrill/page/sitting/msg as sitting_msg
import gleamdrill/page/sitting/update as sitting_update
import gleamdrill/page/sitting/view/drill as drill_view
import gleamdrill/page/sitting/view/report as report_view
import gleamdrill/page/sitting/view/summary as summary_view
import gleamdrill/page/stats/keys as stats_keys
import gleamdrill/page/stats/model as stats_model
import gleamdrill/page/stats/update as stats_update
import gleamdrill/page/stats/view as stats_view
import gleamdrill/page/study/keys as study_keys
import gleamdrill/page/study/model as study_model
import gleamdrill/page/study/update as study_update
import gleamdrill/page/study/view as study_view
import gleamdrill/page/tour/keys as tour_keys
import gleamdrill/page/tour/model as tour_model
import gleamdrill/page/tour/msg as tour_msg
import gleamdrill/page/tour/update as tour_update
import gleamdrill/page/tour/view as tour_view
import gleamdrill/page/tracks/keys as tracks_keys
import gleamdrill/page/tracks/model as tracks_model
import gleamdrill/page/tracks/update as tracks_update
import gleamdrill/page/tracks/view as tracks_view
import gleamdrill/platform/browser
import gleamdrill/route
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/shared/cards as shared_cards
import gleamdrill/shared/common
import gleamdrill/shared/queues as shared_queues
import gleamdrill/shared/run as shared_run
import gleamdrill/shared/session as shared_session
import gleamdrill/shared/stats as shared_stats
import gleamdrill/shared/tracks as shared_tracks
import gleamdrill/shared/update as shared_update
import gleamdrill/store
import gleamdrill/ui/binding.{type Binding}
import gleamdrill/ui/document
import gleamdrill/ui/keyboard
import gleamdrill/ui/keys
import gleamdrill/ui/layout
import gleamdrill/ui/shell
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import modem

pub type State {
  /// `address` is the path the address bar shows, so a screen change knows
  /// whether the URL has to follow it.
  State(shared: Shared, page: Page, address: String)
}

/// The screen on display, holding that screen's own state.
pub type Page {
  Auth(auth_model.Model)
  Settings(settings_model.Model)
  Tracks(tracks_model.Model)
  Stats(stats_model.Model)
  Queue(queue_model.Model)
  Browse(browse_model.Model)
  Study(study_model.Model)
  Tour(tour_model.Model)
  Sitting(sitting_model.Model)
}

pub fn init(boot: #(Shared, Effect(Msg))) -> #(State, Effect(Msg)) {
  let #(shared, fx) = boot
  let address = case modem.initial_uri() {
    Ok(address) -> address.path
    Error(Nil) -> "/"
  }
  let #(state, opened) =
    sync_page(State(shared:, page: Study(study_model.init()), address:))
  #(state, effect.batch([fx, opened, modem.init(msg.UrlChanged)]))
}

/// Every message, then the address bar brought in line with the screen it
/// left behind. Messages handled inside `step` recurse through `step`, so the
/// URL moves once per message from outside, never midway.
pub fn update(state: State, message: Msg) -> #(State, Effect(Msg)) {
  let #(after, fx) = step(state, message)
  let #(after, moved) = follow(state, after, message)
  #(after, effect.batch([fx, moved]))
}

/// The URL for the screen now up, when it differs from the one showing.
///
/// Nothing moves before the first load lands: the route then is a guess the
/// load may overturn (no track yet, a track the account lacks). The landing
/// itself replaces rather than pushes, so Back never returns to a guess. A
/// screen with no address (a sitting) leaves the URL where it was, and a
/// `UrlChanged` already matches by definition.
fn follow(before: State, after: State, message: Msg) -> #(State, Effect(Msg)) {
  let wanted = route.path(after.shared.route, after.shared.active_track)
  case message, after.shared.boot, wanted {
    msg.UrlChanged(_), _, _ -> #(after, effect.none())
    _, model.Synced, Some(path) if path != after.address -> #(
      State(..after, address: path),
      case before.shared.boot {
        model.Synced -> modem.push(path, None, None)
        _ -> modem.replace(path, None, None)
      },
    )
    _, _, _ -> #(after, effect.none())
  }
}

/// Back or Forward: the screen the address names, entering its track first
/// when it names another. Leaving a sitting this way drops its run, as the
/// exit button does. An address naming nothing (`/`, a typo) or the screen
/// already up changes nothing.
fn url_changed(state: State, address: Uri) -> #(State, Effect(Msg)) {
  let state = State(..state, address: address.path)
  let shared = state.shared
  case route.parse(address) {
    None -> #(state, effect.none())
    Some(route.Location(to, track)) -> {
      let track = option.unwrap(track, shared.active_track)
      case
        route.path(to, track) == route.path(shared.route, shared.active_track)
      {
        True -> #(state, effect.none())
        False -> {
          let #(shared, dropped) = case state.page {
            Sitting(page) ->
              apply(shared, [sitting_update.abandon_run(shared, page)])
            _ -> #(shared, effect.none())
          }
          let #(shared, entered) = case track == shared.active_track {
            True -> #(shared, effect.none())
            False -> shared_tracks.enter_track(shared, track, starter: False)
          }
          let #(state, opened) = navigate(State(..state, shared:), to)
          #(state, effect.batch([dropped, entered, opened]))
        }
      }
    }
  }
}

fn step(state: State, message: Msg) -> #(State, Effect(Msg)) {
  case message, state.page {
    msg.AuthMsg(inner), Auth(page) ->
      auth_update.update(state.shared, page, inner)
      |> settle(state, Auth, msg.AuthMsg)
    msg.SettingsMsg(inner), Settings(page) ->
      settings_update.update(state.shared, page, inner)
      |> settle(state, Settings, msg.SettingsMsg)
    msg.TracksMsg(inner), Tracks(page) ->
      tracks_update.update(state.shared, page, inner)
      |> settle(state, Tracks, msg.TracksMsg)
    msg.StatsMsg(inner), Stats(page) ->
      stats_update.update(state.shared, page, inner)
      |> settle(state, Stats, msg.StatsMsg)
    msg.QueueMsg(inner), Queue(page) ->
      queue_update.update(state.shared, page, inner)
      |> settle(state, Queue, msg.QueueMsg)
    msg.BrowseMsg(inner), Browse(page) ->
      browse_update.update(state.shared, page, inner)
      |> settle(state, Browse, msg.BrowseMsg)
    msg.StudyMsg(inner), Study(page) ->
      study_update.update(state.shared, page, inner)
      |> settle(state, Study, msg.StudyMsg)
    msg.TourMsg(inner), Tour(page) ->
      tour_update.update(state.shared, page, inner)
      |> settle(state, Tour, msg.TourMsg)
    msg.SittingMsg(inner), Sitting(page) ->
      sitting_update.update(state.shared, page, inner)
      |> settle(state, Sitting, msg.SittingMsg)
    // A page's message that lands after its page closed (a slow response):
    // there is nothing left for it to update.
    msg.AuthMsg(_), _
    | msg.SettingsMsg(_), _
    | msg.TracksMsg(_), _
    | msg.StatsMsg(_), _
    | msg.QueueMsg(_), _
    | msg.BrowseMsg(_), _
    | msg.StudyMsg(_), _
    | msg.TourMsg(_), _
    | msg.SittingMsg(_), _
    -> #(state, effect.none())

    msg.KeyPressed(key), _ -> key_pressed(state, key)
    msg.UrlChanged(address), _ -> url_changed(state, address)

    // Navigation into pages.
    msg.UserClickedSignIn(mode), _ -> #(
      State(
        ..state,
        shared: model.Model(..state.shared, route: AuthRoute),
        page: Auth(auth_model.init(mode)),
      ),
      effect.none(),
    )
    msg.UserClickedSettings, _ -> navigate(state, SettingsRoute)
    msg.UserClickedStats, _ -> navigate(state, StatsRoute)
    msg.UserClickedQueue, _ -> navigate(state, QueueRoute)
    msg.UserClickedBrowse, _ -> navigate(state, MenuRoute)
    msg.UserClickedTour, _ -> navigate(state, TourRoute)

    // Starting a sitting.
    msg.UserClickedStudy, _ ->
      sitting_update.start_study(state.shared, False) |> open_sitting(state)
    msg.UserClickedRecall, _ ->
      sitting_update.start_study(state.shared, True) |> open_sitting(state)
    msg.UserStartedBlitz(count, per_card_ms), _ ->
      sitting_update.start_blitz(state.shared, count, per_card_ms)
      |> open_sitting(state)
    msg.UserClickedStartDrill, _ ->
      sitting_update.start_manual(state.shared) |> open_sitting(state)
    // An exam draws its questions at random, so the draw is an effect.
    msg.UserClickedStartExam, _ -> #(state, {
      use dispatch <- effect.from
      dispatch(msg.ExamSampled(sitting_update.sample_exam()))
    })
    msg.ExamSampled(refs), _ ->
      sitting_update.start_exam(
        state.shared,
        refs,
        from_study: state.shared.route == StudyRoute,
      )
      |> open_sitting(state)

    _, _ -> {
      let before = state.shared.run
      let #(shared, fx) = shared_update.update(state.shared, message)
      let #(state, opened) = sync_page(State(..state, shared:))
      let #(state, forwarded) = forward(state, message, before)
      #(state, effect.batch([fx, opened, forwarded]))
    }
  }
}

/// A sitting's start: opened on the drill screen, or a notice saying why
/// there is nothing to start.
fn open_sitting(
  started: Result(
    #(sitting_model.Model, Effect(sitting_msg.Msg), List(Change)),
    String,
  ),
  state: State,
) -> #(State, Effect(Msg)) {
  case started {
    Ok(#(page, fx, changes)) -> {
      let state =
        State(
          ..state,
          shared: model.Model(..state.shared, route: DrillRoute),
          page: Sitting(page),
        )
      settle(#(page, fx, changes), state, Sitting, msg.SittingMsg)
    }
    Error(reason) -> #(
      State(..state, shared: model.Model(..state.shared, notice: Some(reason))),
      effect.none(),
    )
  }
}

/// Shared events a page also wants to hear about, after the shared state
/// has taken them in: a runtime coming up, and a run the engine settled.
fn forward(
  state: State,
  message: Msg,
  before: model.RunState,
) -> #(State, Effect(Msg)) {
  let settled = case before, state.shared.run {
    model.Running(_, _), model.Ran(_, _) -> True
    _, _ -> False
  }
  case message, state.page {
    msg.RunnerReady(language), Tour(_) ->
      step(state, msg.TourMsg(tour_msg.RuntimeReady(language)))
    msg.RunnerReady(language), Sitting(_) ->
      step(state, msg.SittingMsg(sitting_msg.RuntimeReady(language)))
    msg.RunFinished(_, _, _), Sitting(_)
    | msg.RunTimedOut(_), Sitting(_)
    | msg.RemoteRunFinished(_, _), Sitting(_)
      if settled
    -> step(state, msg.SittingMsg(sitting_msg.RunLanded))
    _, _ -> #(state, effect.none())
  }
}

pub fn view(state: State) -> Element(Msg) {
  let shared = state.shared
  shell.view(shared, case state.page {
    Auth(page) ->
      shell.Screen(
        auth_view.view(shared, page) |> element.map(msg.AuthMsg),
        page_keys(state),
        auth_keys.label,
      )
    Settings(page) ->
      shell.Screen(
        settings_view.view(shared, page)
          |> document.map(msg.SettingsMsg)
          |> layout.view(shared, SettingsRoute, _),
        page_keys(state),
        settings_keys.label,
      )
    Tracks(page) ->
      shell.Screen(
        tracks_view.view(shared, page)
          |> document.map(msg.TracksMsg)
          |> layout.view(shared, TracksRoute, _),
        page_keys(state),
        tracks_keys.label,
      )
    Stats(page) ->
      shell.Screen(
        stats_view.view(shared, page)
          |> document.map(msg.StatsMsg)
          |> layout.view(shared, StatsRoute, _),
        page_keys(state),
        stats_keys.label,
      )
    Queue(page) ->
      shell.Screen(
        queue_view.view(shared, page)
          |> document.map(msg.QueueMsg)
          |> layout.view(shared, QueueRoute, _),
        page_keys(state),
        queue_keys.label,
      )
    Browse(page) ->
      shell.Screen(
        case page.compare {
          Some(opened) ->
            compare_view.view(opened) |> element.map(msg.BrowseMsg)
          None ->
            browse_view.view(shared, page)
            |> document.map(msg.BrowseMsg)
            |> layout.view(shared, MenuRoute, _)
        },
        page_keys(state),
        browse_keys.label(page),
      )
    Study(page) ->
      shell.Screen(
        study_view.view(shared, page)
          |> document.map(msg.StudyMsg)
          |> layout.view(shared, StudyRoute, _),
        page_keys(state),
        study_keys.label,
      )
    Tour(page) ->
      shell.Screen(
        tour_view.view(shared, page)
          |> document.map(msg.TourMsg)
          |> layout.view(shared, TourRoute, _),
        page_keys(state),
        tour_keys.label,
      )
    Sitting(page) ->
      shell.Screen(
        case shared.route {
          SummaryRoute ->
            summary_view.view(shared, page) |> element.map(msg.SittingMsg)
          ReportRoute -> report_view.view(page) |> element.map(msg.SittingMsg)
          _ ->
            drill_view.view(shared, page)
            |> document.map(msg.SittingMsg)
            |> layout.view(shared, DrillRoute, _)
        },
        page_keys(state),
        sitting_keys.label(shared, page),
      )
  })
}

/// The page's own rows, lifted into the app's message.
fn page_keys(state: State) -> List(Binding(Msg)) {
  case state.page {
    Auth(page) -> auth_keys.bindings(state.shared, page) |> lift(msg.AuthMsg)
    Settings(page) ->
      settings_keys.bindings(state.shared, page) |> lift(msg.SettingsMsg)
    Tracks(page) ->
      tracks_keys.bindings(state.shared, page) |> lift(msg.TracksMsg)
    Stats(page) -> stats_keys.bindings(state.shared, page) |> lift(msg.StatsMsg)
    Queue(page) -> queue_keys.bindings(state.shared, page) |> lift(msg.QueueMsg)
    Browse(page) ->
      browse_keys.bindings(state.shared, page) |> lift(msg.BrowseMsg)
    Study(page) -> study_keys.bindings(state.shared, page) |> lift(msg.StudyMsg)
    Tour(page) -> tour_keys.bindings(state.shared, page) |> lift(msg.TourMsg)
    Sitting(page) ->
      sitting_keys.bindings(state.shared, page) |> lift(msg.SittingMsg)
  }
}

/// What a key means on the page: its own dispatcher where it has one (for
/// keys that share a row, like j and k), else the first row claiming it.
fn page_dispatch(state: State, key: String) -> Result(Msg, Nil) {
  case state.page {
    Stats(page) ->
      stats_keys.dispatch(state.shared, page, key)
      |> result.map(msg.StatsMsg)
    Queue(page) ->
      queue_keys.dispatch(state.shared, page, key)
      |> result.map(msg.QueueMsg)
    Browse(page) ->
      browse_keys.dispatch(state.shared, page, key)
      |> result.map(msg.BrowseMsg)
    Tour(page) ->
      tour_keys.dispatch(state.shared, page, key)
      |> result.map(msg.TourMsg)
    Sitting(page) ->
      sitting_keys.dispatch(state.shared, page, key)
      |> result.map(msg.SittingMsg)
    _ -> binding.find(page_keys(state), key)
  }
}

fn lift(rows: List(Binding(a)), to: fn(a) -> Msg) -> List(Binding(Msg)) {
  list.map(rows, binding.map(_, to))
}

/// A page's update result folded back in: its model stored, its effect
/// lifted, its changes applied, and the page re-matched to the route.
fn settle(
  result: #(page, Effect(page_msg), List(Change)),
  state: State,
  page: fn(page) -> Page,
  to: fn(page_msg) -> Msg,
) -> #(State, Effect(Msg)) {
  let #(model, fx, changes) = result
  let #(shared, applied) = apply(state.shared, changes)
  let #(state, opened) = sync_page(State(..state, shared:, page: page(model)))
  let settled = #(state, effect.batch([effect.map(fx, to), applied, opened]))
  // Messages a page handed up run last, against the settled state.
  list.fold(changes, settled, fn(acc, change) {
    case change {
      shared.Dispatch(message) -> {
        let #(state, fx) = acc
        let #(state, more) = step(state, message)
        #(state, effect.batch([fx, more]))
      }
      _ -> acc
    }
  })
}

/// A key on a page screen: the same leader and focus rules as everywhere,
/// resolved against an open overlay first, then the page's rows.
fn key_pressed(state: State, key: msg.Key) -> #(State, Effect(Msg)) {
  let lookup = fn(shared, key: msg.Key) {
    case keys.overlay(shared) {
      Ok(overlay) -> binding.find(overlay, key.key)
      Error(Nil) -> page_dispatch(State(..state, shared:), key.key)
    }
  }
  let #(shared, outcome) = keyboard.step(state.shared, key, lookup)
  let state = State(..state, shared:)
  case outcome {
    keyboard.Ignore -> #(state, effect.none())
    keyboard.Blur -> #(state, common.run_effect(browser.blur_active))
    keyboard.Send(resolved) -> step(state, resolved)
  }
}

fn navigate(state: State, route: Route) -> #(State, Effect(Msg)) {
  sync_page(State(..state, shared: model.Model(..state.shared, route:)))
}

/// Applies a page's changes to the shared state, in order.
fn apply(shared: Shared, changes: List(Change)) -> #(Shared, Effect(Msg)) {
  let #(shared, effects) =
    list.fold(changes, #(shared, []), fn(acc, change) {
      let #(shared, effects) = acc
      let #(shared, more) = apply_change(shared, change)
      #(shared, [more, ..effects])
    })
  #(shared, effect.batch(list.reverse(effects)))
}

fn apply_change(shared: Shared, change: Change) -> #(Shared, Effect(Msg)) {
  case change {
    shared.Navigate(route) -> #(model.Model(..shared, route:), effect.none())
    shared.SignedIn(session, registered) ->
      shared_session.signed_in(shared, session, registered)
    shared.Notice(text) -> #(
      model.Model(..shared, notice: Some(text)),
      effect.none(),
    )
    shared.ProfileChanged(profile) -> #(
      model.Model(
        ..shared,
        settings: profile.settings,
        account: profile.account,
      ),
      effect.none(),
    )
    shared.KeymapChanged(mode) -> {
      let shared = model.Model(..shared, editor_keymap: mode)
      #(shared, common.save_preferences(shared))
    }
    shared.Refreshing(on) -> #(
      model.Model(..shared, refreshing: on),
      effect.none(),
    )
    shared.Reload -> #(
      model.Model(..shared, refreshing: True),
      store.load_state(shared, msg.StateLoaded),
    )
    shared.ToggleHelp -> keyboard.toggle_help(shared)
    shared.LoadStats -> shared_stats.reload(shared)
    shared.QueuesEdited(queues) -> {
      let shared = model.Model(..shared, queues:)
      #(shared, store.save_queues(shared, msg.QueuesSaved))
    }
    shared.ActiveQueueChanged(name) -> {
      let shared = model.Model(..shared, active_queue: name)
      #(shared, common.save_preferences(shared))
    }
    shared.QueueChangeLanded(result) -> shared_queues.changed(shared, result)
    shared.ResetRun -> #(
      model.Model(..shared, run: model.RunIdle),
      effect.none(),
    )
    shared.RunLocal(language, code, harness) ->
      common.start_local_run(shared, language, code, harness)
    shared.Prefetch(language) -> common.prefetch(shared, language)
    shared.EditorHeightChanged(height) -> {
      let shared =
        model.Model(..shared, editor_height: case height > 0 {
          True -> Some(height)
          False -> None
        })
      #(shared, common.save_preferences(shared))
    }
    shared.TourLessonOpened(lesson) -> {
      let shared = model.Model(..shared, tour_lesson: lesson)
      #(shared, common.save_preferences(shared))
    }
    shared.TourEdited(lesson, code) -> #(
      model.Model(..shared, tour_edits: case code {
        Some(code) -> dict.insert(shared.tour_edits, lesson, code)
        None -> dict.delete(shared.tour_edits, lesson)
      }),
      effect.none(),
    )
    shared.SelectionChanged(selected) -> #(
      model.Model(..shared, selected:),
      effect.none(),
    )
    shared.EnterTrack(track, starter) ->
      shared_tracks.enter_track(shared, track, starter:)
    shared.ReviewLanded(outcome) -> shared_cards.landed(shared, outcome)
    shared.UndoLanded(problem, outcome) ->
      shared_cards.undo_landed(shared, problem, outcome)
    shared.WriteFailed(failure) -> #(
      common.write_failed(shared, failure),
      effect.none(),
    )
    shared.DraftChanged(problem, text) -> #(
      model.Model(
        ..shared,
        drafts: model.assoc_put(shared.drafts, problem, text),
      ),
      effect.none(),
    )
    shared.DraftDropped(problem) -> #(
      model.Model(..shared, drafts: guest.drop_draft(shared.drafts, problem)),
      effect.none(),
    )
    shared.NoteChanged(problem, text) -> #(
      model.Model(..shared, notes: model.assoc_put(shared.notes, problem, text)),
      effect.none(),
    )
    shared.PromptToggled -> {
      let shared = model.Model(..shared, prompt_open: !shared.prompt_open)
      #(shared, common.save_preferences(shared))
    }
    shared.ResultsToggled -> #(
      model.Model(..shared, results_collapsed: !shared.results_collapsed),
      effect.none(),
    )
    shared.DiffToggled -> #(
      model.Model(..shared, diff_mode: !shared.diff_mode),
      effect.none(),
    )
    shared.RunRemote(language, code, harness) ->
      shared_run.start_remote(shared, language, code, harness)
    shared.AbandonRun(language) -> shared_run.abandon(shared, language)
    shared.RestartRuntime(language) ->
      shared_run.retry_runtime(shared, language)
    shared.RunRestored(run) -> #(model.Model(..shared, run:), effect.none())
    shared.NoticeCleared -> #(
      model.Model(..shared, notice: None),
      effect.none(),
    )
    // Run by `settle` once the rest have landed.
    shared.Dispatch(_) -> #(shared, effect.none())
  }
}

/// The route decides which page is up: landing on a page's route opens it
/// fresh (with whatever its init fetches); leaving it closes it.
fn sync_page(state: State) -> #(State, Effect(Msg)) {
  let shared = state.shared
  case shared.route, state.page {
    AuthRoute, Auth(_)
    | SettingsRoute, Settings(_)
    | TracksRoute, Tracks(_)
    | StatsRoute, Stats(_)
    | QueueRoute, Queue(_)
    | MenuRoute, Browse(_)
    | CompareRoute, Browse(_)
    | StudyRoute, Study(_)
    | TourRoute, Tour(_)
    | DrillRoute, Sitting(_)
    | SummaryRoute, Sitting(_)
    | ReportRoute, Sitting(_)
    -> #(state, effect.none())
    AuthRoute, _ -> #(
      State(..state, page: Auth(auth_model.init(auth_model.SigningIn))),
      effect.none(),
    )
    SettingsRoute, _ ->
      settings_update.init(shared) |> settle(state, Settings, msg.SettingsMsg)
    TracksRoute, _ -> #(
      State(..state, page: Tracks(tracks_model.Model)),
      effect.none(),
    )
    StatsRoute, _ ->
      stats_update.init(shared) |> settle(state, Stats, msg.StatsMsg)
    QueueRoute, _ ->
      queue_update.init(shared) |> settle(state, Queue, msg.QueueMsg)
    MenuRoute, _ | CompareRoute, _ ->
      browse_update.init(shared) |> settle(state, Browse, msg.BrowseMsg)
    StudyRoute, _ ->
      study_update.init(shared) |> settle(state, Study, msg.StudyMsg)
    TourRoute, _ -> tour_update.init(shared) |> settle(state, Tour, msg.TourMsg)
    // A sitting only opens by being started; anything else landing on its
    // routes (a stale undo after the sitting closed) goes home.
    DrillRoute, _ | SummaryRoute, _ | ReportRoute, _ ->
      navigate(state, StudyRoute)
  }
}
