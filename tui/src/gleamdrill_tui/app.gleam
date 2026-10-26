//// The terminal app's state and everything that changes it: the windows,
//// tmux's prefix and command line, a sitting and its panes, grading, and
//// the two stores. Drawing is `view`.
////
//// Scheduling is the web's own code throughout. The shared `Model` is kept
//// filled for the active track exactly as the web fills it, so
//// `domain/queue` picks today's drills, `domain/guest` records a guest's
//// grades, and `wire` speaks to the server, with nothing re-derived here.

import fsrs
import gleam/dict
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import gleam/time/timestamp.{type Timestamp}
import gleamdrill/content/problem.{type Problem}
import gleamdrill/content/problems
import gleamdrill/domain/guest
import gleamdrill/domain/queue
import gleamdrill/domain/track
import gleamdrill/model as web
import gleamdrill/shared/common
import gleamdrill/ui/tmux/command.{type Command}
import gleamdrill/ui/tmux/prefix
import gleamdrill/ui/tmux/windows
import gleamdrill_tui/editor.{type Editor}
import gleamdrill_tui/keys
import gleamdrill_tui/run
import gleamdrill_tui/runtime.{type Effect}
import gleamdrill_tui/store
import gleamdrill_tui/sys
import wire.{type ProblemRef}

// --- the model ------------------------------------------------------------------

pub type Model {
  Model(
    /// The web app's model for the active track: mode, clock, settings,
    /// cards, today's budget, drafts and queues. Everything else here is the
    /// terminal's own.
    shared: web.Model,
    guest: store.Guest,
    /// False when the guest file exists but didn't read: never overwrite it.
    guest_writable: Bool,
    loading: Bool,
    window: Int,
    last_window: Option(Int),
    last_track: Option(String),
    /// The prefix key, etui-spelled: `ctrl+b`, or `GLEAMDRILL_PREFIX`.
    prefix_key: String,
    armed: Bool,
    prompt: Option(String),
    history: List(String),
    /// How far Up has walked into `history`; -1 is the line being typed.
    history_at: Int,
    message: Option(String),
    /// The list-keys overlay, scrolled this far.
    help: Option(Int),
    chooser: Option(Chooser),
    study_cursor: Int,
    browse: Browse,
    queue_cursor: Int,
    stats: Option(Result(wire.Stats, String)),
    sitting: Option(Sitting),
    login: Option(Login),
    /// Milliseconds since start, for the spinner.
    clock: Int,
    quit: Bool,
  )
}

pub type Chooser {
  /// `sessions`: tracks rather than windows.
  Chooser(sessions: Bool, cursor: Int)
}

pub type Browse {
  Browse(cursor: Int, filter: String, typing: Bool)
}

pub type Login {
  Login(email: String, password: String, on_password: Bool, busy: Bool)
}

pub type Pane {
  PromptPane
  CodePane
  OutputPane
}

pub type Sitting {
  Sitting(
    refs: List(ProblemRef),
    index: Int,
    /// From the study queue, rather than one drill picked to practise.
    studying: Bool,
    ref: ProblemRef,
    problem: Problem,
    draft: String,
    run: web.RunState,
    run_id: Int,
    pane: Pane,
    last_pane: Pane,
    zoomed: Bool,
    /// After `C-b q`: the next digit picks a pane.
    numbered: Bool,
    /// The reference solution is up in the code pane.
    revealed: Bool,
    /// Which reference solution is up: `[` and `]` step through them.
    solution: Int,
    /// A solution or an answer has been shown, even if hidden again: the
    /// grade says so.
    peeked: Bool,
    /// For a quiz: the choice made, once made.
    chosen: Option(Int),
    scroll: #(Int, Int, Int),
    started_ms: Int,
    graded: List(#(ProblemRef, fsrs.Rating, Int)),
    /// Waiting on the server to take a grade.
    grading: Bool,
    /// The sitting is over and the summary is up.
    done: Bool,
    /// The built-in editor, open in the code pane.
    editing: Option(Editor),
    /// Cards graded in this sitting that are due back before it would end
    /// (a learning step: 1m, 10m), with when, in `sys.now_ms` time. Each
    /// comes back into the sitting at its time.
    returning: List(#(ProblemRef, Int)),
    /// The list is done but a card is still to come back: the drill window
    /// counts down to it instead of ending.
    waiting: Bool,
  )
}

pub type Msg {
  Booted(Result(wire.BootState, store.ApiError))
  EditorClosed(Result(String, String))
  RunFinished(Int, web.RunState)
  Graded(fsrs.Rating, Result(wire.ReviewOutcome, store.ApiError))
  QueueChanged(Result(wire.QueueChange, store.ApiError))
  StatsLoaded(Result(wire.Stats, store.ApiError))
  LoggedIn(Result(wire.Session, store.ApiError))
  DraftSaved(Result(Nil, store.ApiError))
  LoggedOut
}

type Step =
  #(Model, List(Effect(Msg)))

/// Not tmux's C-b: inside tmux (or herdr) the outer one would take it.
pub const default_prefix = "ctrl+a"

pub fn load() -> Step {
  let #(guest_store, writable, message) = case store.load_guest() {
    Ok(loaded) -> #(loaded, True, None)
    Error(reason) -> #(
      store.Guest(guest.empty(), wire.default_account(), []),
      False,
      Some(reason),
    )
  }
  let active =
    store.load_track()
    |> option.to_result(Nil)
    |> result.try(fn(name) {
      case track.exists(name) {
        True -> Ok(name)
        False -> Error(Nil)
      }
    })
    |> result.lazy_or(fn() { list.first(track.all()) })
    |> result.unwrap("")
  let base =
    new(
      guest_store,
      writable,
      sys.env("GLEAMDRILL_PREFIX") |> result.unwrap(default_prefix),
    )
  let base = Model(..base, message:)
  case store.load_token() {
    Some(token) -> open_account(base, token, active)
    None -> #(open_guest(base, active), [])
  }
}

/// A model with nothing open: the study window, no track loaded.
pub fn new(guest: store.Guest, writable: Bool, prefix_key: String) -> Model {
  Model(
    shared: web.default(),
    guest:,
    guest_writable: writable,
    loading: False,
    window: 0,
    last_window: None,
    last_track: None,
    prefix_key:,
    armed: False,
    prompt: None,
    history: [],
    history_at: -1,
    message: None,
    help: None,
    chooser: None,
    study_cursor: 0,
    browse: Browse(0, "", False),
    queue_cursor: 0,
    stats: None,
    sitting: None,
    login: None,
    clock: 0,
    quit: False,
  )
}

// --- the stores -----------------------------------------------------------------

fn now() -> Timestamp {
  timestamp.system_time()
}

/// Fills the shared model from the guest file for one track.
pub fn open_guest(m: Model, name: String) -> Model {
  let settings = store.settings_for(m.guest, name)
  let local = m.guest.local
  let moment = now()
  let shared =
    web.Model(
      ..m.shared,
      mode: web.Guest,
      boot: web.NotStarted,
      now: moment,
      settings:,
      account: m.guest.account,
      active_track: name,
      cards: guest.cards_in(local, name)
        |> list.map(fn(card) { #(card.problem, card) })
        |> dict.from_list,
      today: guest.today(
        local,
        name,
        settings,
        moment,
        store.study_day(m.guest.account),
      ),
      drafts: guest.drafts_in(local, name),
      notes: guest.notes_in(local, name),
      queues: guest.queues_in(local, name),
    )
  store.save_track(name)
  Model(..m, shared:, loading: False, stats: None)
}

fn open_account(m: Model, token: String, name: String) -> Step {
  let shared =
    web.Model(
      ..m.shared,
      mode: web.Account(token),
      boot: web.Syncing,
      active_track: name,
    )
  store.save_track(name)
  #(Model(..m, shared:, loading: True, stats: None), [
    runtime.from_promise(fn() { store.state(token, name) }, Booted),
  ])
}

fn token(m: Model) -> Option(String) {
  case m.shared.mode {
    web.Account(token) -> Some(token)
    web.Guest -> None
  }
}

fn switch_track(m: Model, name: String) -> Step {
  let m =
    Model(
      ..m,
      last_track: Some(m.shared.active_track),
      study_cursor: 0,
      queue_cursor: 0,
      browse: Browse(0, "", False),
      sitting: None,
      window: case m.window >= 6 {
        True -> 0
        False -> m.window
      },
    )
  let #(m, effects) = case m.shared.mode {
    web.Account(token) -> open_account(m, token, name)
    web.Guest -> #(open_guest(m, name), [])
  }
  // The stats on screen were the old track's.
  case m.window {
    3 -> {
      let #(m, more) = load_stats(m)
      #(m, list.append(effects, more))
    }
    _ -> #(m, effects)
  }
}

fn apply_boot(m: Model, state: wire.BootState) -> Model {
  let shared =
    web.Model(
      ..m.shared,
      user: Some(state.user),
      boot: web.Synced,
      now: state.now,
      settings: state.settings,
      account: state.account,
      active_track: state.track,
      tracks: state.tracks,
      cards: state.cards
        |> list.map(fn(card) { #(card.problem, card) })
        |> dict.from_list,
      today: state.today,
      drafts: state.drafts,
      notes: state.notes,
      queues: state.queues,
    )
  Model(..m, shared:, loading: False)
}

/// Saves the guest store, saying so when it can't.
fn save_guest(m: Model) -> Model {
  case m.guest_writable {
    False -> m
    True ->
      case store.save_guest(m.guest, now()) {
        Ok(Nil) -> m
        Error(reason) -> say(m, "not saved: " <> reason)
      }
  }
}

/// Signed out by the server: back to the guest store, and say so.
fn signed_out(m: Model) -> Model {
  store.clear_token()
  open_guest(m, m.shared.active_track)
  |> say(store.error_text(store.Unauthorised))
}

fn failed(m: Model, error: store.ApiError) -> Model {
  case error {
    store.Unauthorised -> signed_out(m)
    store.Failed(text) -> say(m, text)
  }
}

pub fn say(m: Model, text: String) -> Model {
  Model(..m, message: Some(text))
}

// --- what's listed ----------------------------------------------------------------

/// Today's drills for the study window: due first, then new, as the web picks.
pub fn today(m: Model) -> List(ProblemRef) {
  queue.build(web.Model(..m.shared, now: now()))
}

/// How many more new drills `m` adds to a sitting.
pub const study_more = 10

/// Today's drills with `extra` more new ones than the daily limit allows.
pub fn today_plus(m: Model, extra: Int) -> List(ProblemRef) {
  let today = m.shared.today
  queue.build(
    web.Model(
      ..m.shared,
      now: now(),
      today: wire.Today(..today, new_remaining: today.new_remaining + extra),
    ),
  )
}

/// Queued new drills the daily limit keeps out of today's list.
pub fn held_back(m: Model) -> Int {
  list.length(today_plus(m, 1_000_000)) - list.length(today(m))
}

pub fn browse_refs(m: Model) -> List(ProblemRef) {
  case m.browse.filter {
    "" -> problems.refs_in(m.shared.active_track)
    query -> problems.search_refs_in(m.shared.active_track, query)
  }
}

/// Every card in the track, soonest due first.
pub fn queued(m: Model) -> List(wire.CardState) {
  dict.values(m.shared.cards)
  |> list.sort(fn(a, b) {
    int.compare(
      fsrs.interval_seconds(a.card, m.shared.now),
      fsrs.interval_seconds(b.card, m.shared.now),
    )
  })
}

pub fn window_names(m: Model) -> List(String) {
  windows.all(
    web.Model(..m.shared, route: case m.sitting {
      Some(_) -> web.DrillRoute
      None -> web.StudyRoute
    }),
  )
  |> list.map(fn(window) { window.name })
}

// --- the loop's callbacks ---------------------------------------------------------

/// The clock moved on: a frame is wanted when a waiting sitting's card came
/// back, as no key was pressed to bring it.
pub fn update(m: Model, dt: Int) -> #(Model, Bool) {
  let ticked = tick(Model(..m, clock: m.clock + dt), sys.now_ms())
  #(ticked, is_waiting(ticked) != is_waiting(m))
}

fn is_waiting(m: Model) -> Bool {
  case m.sitting {
    Some(s) -> s.waiting
    None -> False
  }
}

pub fn received(m: Model, message: Msg) -> Step {
  case message {
    Booted(Ok(state)) -> #(apply_boot(m, state), [])
    Booted(Error(error)) -> #(failed(Model(..m, loading: False), error), [])
    EditorClosed(Ok(text)) -> edited(m, text)
    EditorClosed(Error(reason)) -> #(say(m, reason), [])
    RunFinished(id, state) ->
      case m.sitting {
        Some(s) if s.run_id != id -> #(m, [])
        // Typing in the built-in editor keeps the keys; the status line
        // says how the run went, as the output may be a tab away.
        Some(Sitting(editing: Some(_), pane: CodePane, ..)) -> #(
          with_sitting(m, fn(s) { Sitting(..s, run: state) })
            |> say(case web.run_passed(state) {
              True -> "passed ✓"
              False -> "failed: see output"
            }),
          [],
        )
        _ -> #(
          with_sitting(m, fn(s) {
            Sitting(..s, run: state, pane: OutputPane, last_pane: s.pane)
          }),
          [],
        )
      }
    Graded(rating, Ok(outcome)) -> {
      let shared =
        web.Model(
          ..m.shared,
          now: outcome.now,
          today: outcome.today,
          cards: common.fold_card(m.shared, m.shared.cards, outcome.card),
          drafts: guest.drop_draft(m.shared.drafts, outcome.card.problem),
        )
      #(advance(Model(..m, shared:), Some(#(rating, outcome.card))), [])
    }
    Graded(_, Error(error)) -> #(
      with_sitting(m, fn(s) { Sitting(..s, grading: False) }) |> failed(error),
      [],
    )
    QueueChanged(Ok(change)) -> {
      let cards =
        list.fold(change.cards, m.shared.cards, fn(cards, card) {
          common.fold_card(m.shared, cards, card)
        })
      let cards = list.fold(change.removed, cards, dict.delete)
      let shared =
        web.Model(..m.shared, now: change.now, today: change.today, cards:)
      let m = Model(..m, shared:)
      #(
        case change.refused, change.removed, change.cards {
          [_, ..], _, _ ->
            say(m, "reviewed cards stay in the queue; suspend them on the web")
          [], [_, ..] as removed, _ ->
            say(m, plural(list.length(removed), "drill") <> " removed")
          [], [], cards ->
            say(m, plural(list.length(cards), "drill") <> " queued")
        },
        [],
      )
    }
    QueueChanged(Error(error)) -> #(failed(m, error), [])
    StatsLoaded(result) -> #(
      Model(..m, stats: Some(result.map_error(result, store.error_text))),
      [],
    )
    LoggedIn(Ok(session)) -> {
      let m = Model(..m, login: None)
      case store.save_token(session.token) {
        Ok(Nil) -> Nil
        Error(_) -> Nil
      }
      let #(m, effects) = open_account(m, session.token, m.shared.active_track)
      #(say(m, "signed in as " <> session.user.email), effects)
    }
    LoggedIn(Error(error)) -> #(
      Model(
        ..m,
        login: option.map(m.login, fn(login) { Login(..login, busy: False) }),
      )
        |> say(case error {
          store.Unauthorised -> "wrong email or password"
          store.Failed(text) -> text
        }),
      [],
    )
    DraftSaved(Ok(Nil)) -> #(m, [])
    DraftSaved(Error(error)) -> #(failed(m, error), [])
    LoggedOut -> #(m, [])
  }
}

pub fn keypressed(m: Model, raw: String) -> Step {
  let m = Model(..m, message: None)
  case m.prompt, m.armed, m.login, m.chooser, m.help {
    Some(text), _, _, _, _ -> prompt_key(m, text, raw)
    None, True, _, _, _ -> prefixed(Model(..m, armed: False), raw)
    None, False, _, _, _ if raw == m.prefix_key -> #(Model(..m, armed: True), [])
    None, False, _, _, _ if raw == "ctrl+c" -> quitting(m)
    None, False, Some(login), _, _ -> login_key(m, login, raw)
    None, False, None, Some(chooser), _ -> chooser_key(m, chooser, raw)
    None, False, None, None, Some(scroll) -> help_key(m, scroll, raw)
    None, False, None, None, None -> page_key(m, raw)
  }
}

pub fn quit(m: Model) -> Bool {
  m.quit
}

/// Quits, keeping what the built-in editor holds.
fn quitting(m: Model) -> Step {
  let #(m, effects) = close_editor(m)
  #(Model(..m, quit: True), effects)
}

/// Pasted text, as one piece: into the built-in editor, the command line or
/// the sign-in form, whichever is taking keys.
pub fn pasted(m: Model, text: String) -> Step {
  let line = string.replace(text, "\r", "") |> string.replace("\n", " ")
  case m.prompt, m.login, m.sitting {
    Some(prompt), _, _ -> #(Model(..m, prompt: Some(prompt <> line)), [])
    None, Some(Login(busy: False, ..) as login), _ -> #(
      Model(
        ..m,
        login: Some(case login.on_password {
          True -> Login(..login, password: login.password <> string.trim(line))
          False -> Login(..login, email: login.email <> string.trim(line))
        }),
      ),
      [],
    )
    None, None, Some(Sitting(editing: Some(e), pane: CodePane, ..))
      if m.window == 6
    -> #(
      with_sitting(m, fn(s) {
        Sitting(..s, editing: Some(editor.paste(e, text)))
      }),
      [],
    )
    _, _, _ -> #(m, [])
  }
}

/// A spinner is on screen.
pub fn animating(m: Model) -> Bool {
  m.loading
  || { m.window == 3 && m.stats == None }
  || case m.sitting, m.login {
    Some(Sitting(run: web.Running(_, _), ..)), _ -> True
    _, Some(Login(busy: True, ..)) -> True
    _, _ -> False
  }
}

// --- the prefix and the command line ----------------------------------------------

fn prefixed(m: Model, raw: String) -> Step {
  case raw {
    "esc" -> #(m, [])
    // Twice sends it on: in the editor, C-a C-a is the start of the line.
    _ if raw == m.prefix_key -> page_key(m, raw)
    _ ->
      case prefix.lookup(keys.to_web(raw)) {
        Ok(cmd) -> run_command(m, cmd)
        // As in the web: a key the prefix table lacks is the page's.
        Error(Nil) -> page_key(m, raw)
      }
  }
}

fn prompt_key(m: Model, text: String, raw: String) -> Step {
  case raw {
    "esc" -> #(Model(..m, prompt: None, history_at: -1), [])
    "enter" -> {
      let m =
        Model(
          ..m,
          prompt: None,
          history_at: -1,
          history: case string.trim(text) {
            "" -> m.history
            line -> [line, ..list.filter(m.history, fn(h) { h != line })]
          },
        )
      case string.trim(text) {
        "" -> #(m, [])
        line ->
          case command.parse(line) {
            Ok(cmd) -> run_command(m, cmd)
            Error(reason) -> #(say(m, reason), [])
          }
      }
    }
    "tab" ->
      case command.complete(text) {
        Ok(name) -> #(Model(..m, prompt: Some(name <> " ")), [])
        Error(Nil) -> #(m, [])
      }
    "up" -> recall(m, m.history_at + 1)
    "down" -> recall(m, m.history_at - 1)
    "backspace" -> #(Model(..m, prompt: Some(string.drop_end(text, 1))), [])
    _ ->
      case keys.printable(raw) {
        Ok(char) -> #(Model(..m, prompt: Some(text <> char)), [])
        Error(Nil) -> #(m, [])
      }
  }
}

fn recall(m: Model, at: Int) -> Step {
  case at < 0, list.drop(m.history, at) {
    True, _ -> #(Model(..m, prompt: Some(""), history_at: -1), [])
    False, [line, ..] -> #(Model(..m, prompt: Some(line), history_at: at), [])
    False, [] -> #(m, [])
  }
}

pub fn run_command(m: Model, cmd: Command) -> Step {
  case cmd {
    command.SelectWindow(target) ->
      case window_index(m, target) {
        Ok(n) -> go_to_window(m, n)
        Error(reason) -> #(say(m, reason), [])
      }
    command.ChooseWindow -> #(
      Model(..m, chooser: Some(Chooser(False, m.window))),
      [],
    )
    command.ChooseSession -> #(
      Model(
        ..m,
        chooser: Some(Chooser(True, track_position(m.shared.active_track))),
      ),
      [],
    )
    command.KillWindow ->
      case m.window, m.sitting {
        6, Some(_) -> {
          let #(m, effects) = close_editor(m)
          #(Model(..m, sitting: None, window: 0), effects)
        }
        _, _ -> go_to_window(m, 0)
      }
    command.SwitchClient(target) ->
      case track_target(m, target) {
        Ok(name) if name == m.shared.active_track -> #(m, [])
        Ok(name) -> switch_track(m, name)
        Error(reason) -> #(say(m, reason), [])
      }
    command.DetachClient -> quitting(m)
    command.CommandPrompt -> #(Model(..m, prompt: Some(""), history_at: -1), [])
    command.ListKeys -> #(Model(..m, help: Some(0)), [])
    command.SendPrefix -> #(
      say(m, "nothing here takes " <> keys.tmux_name(m.prefix_key)),
      [],
    )
    command.SendKeys(sent) ->
      list.fold(sent, #(m, []), fn(acc, key) {
        let #(m, effects) = acc
        let #(m, more) = keypressed(m, keys.from_web(key))
        #(m, list.append(effects, more))
      })
    command.DisplayMessage(text) -> #(say(m, text), [])
    command.SelectPane(target) -> on_drill(m, fn(s) { select_pane(s, target) })
    command.DisplayPanes -> on_drill(m, fn(s) { Sitting(..s, numbered: True) })
    command.ZoomPane -> on_drill(m, fn(s) { Sitting(..s, zoomed: !s.zoomed) })
    command.KillPane ->
      case m.sitting {
        Some(s) if m.window == 6 && s.pane == CodePane && s.revealed -> #(
          with_sitting(m, fn(s) { Sitting(..s, revealed: False) }),
          [],
        )
        Some(s) if m.window == 6 -> #(
          say(m, "can't kill the " <> pane_name(s.pane) <> " pane"),
          [],
        )
        _ -> #(say(m, "no panes here"), [])
      }
  }
}

fn on_drill(m: Model, change: fn(Sitting) -> Sitting) -> Step {
  case m.window == 6 && option.is_some(m.sitting) {
    True -> #(with_sitting(m, change), [])
    False -> #(say(m, "panes are on the drill window"), [])
  }
}

fn with_sitting(m: Model, change: fn(Sitting) -> Sitting) -> Model {
  Model(..m, sitting: option.map(m.sitting, change))
}

fn go_to_window(m: Model, n: Int) -> Step {
  case n == m.window {
    True -> #(m, [])
    False -> {
      let m = Model(..m, window: n, last_window: Some(m.window), chooser: None)
      case n {
        3 -> load_stats(m)
        _ -> #(m, [])
      }
    }
  }
}

fn window_index(m: Model, target: command.Target) -> Result(Int, String) {
  let names = window_names(m)
  let count = list.length(names)
  case target {
    command.Index(n) if n >= 0 && n < count -> Ok(n)
    command.Index(n) -> Error("can't find window: " <> int.to_string(n))
    command.Next -> Ok({ m.window + 1 } % count)
    command.Previous -> Ok({ m.window - 1 + count } % count)
    command.Last ->
      case m.last_window {
        Some(n) if n < count -> Ok(n)
        _ -> Error("no last window")
      }
    command.Named(name) ->
      case
        list.index_map(names, fn(window, i) { #(window, i) })
        |> list.filter(fn(pair) { string.starts_with(pair.0, name) })
      {
        [#(_, i)] -> Ok(i)
        _ -> Error("can't find window: " <> name)
      }
  }
}

pub fn track_position(name: String) -> Int {
  list.index_map(track.all(), fn(t, i) { #(t, i) })
  |> list.key_find(name)
  |> result.unwrap(0)
}

fn track_target(m: Model, target: command.Target) -> Result(String, String) {
  let tracks = track.all()
  let count = list.length(tracks)
  let here = track_position(m.shared.active_track)
  let at = fn(i) {
    list.drop(tracks, i)
    |> list.first
    |> result.replace_error("can't find client")
  }
  case target {
    command.Index(n) -> at(n)
    command.Next -> at({ here + 1 } % count)
    command.Previous -> at({ here - 1 + count } % count)
    command.Last -> option.to_result(m.last_track, "no last client")
    // An exact name wins over the names it starts, as in tmux.
    command.Named(name) ->
      case
        list.find(tracks, fn(t) { track.slug(t) == name || t == name }),
        list.filter(tracks, fn(t) {
          string.starts_with(track.slug(t), name) || string.starts_with(t, name)
        })
      {
        Ok(one), _ | _, [one] -> Ok(one)
        _, _ -> Error("can't find client: " <> name)
      }
  }
}

// --- the overlays -----------------------------------------------------------------

fn chooser_key(m: Model, chooser: Chooser, raw: String) -> Step {
  let count = case chooser.sessions {
    True -> list.length(track.all())
    False -> list.length(window_names(m))
  }
  let move = fn(by) {
    #(
      Model(
        ..m,
        chooser: Some(
          Chooser(..chooser, cursor: { chooser.cursor + by + count } % count),
        ),
      ),
      [],
    )
  }
  let pick = fn(n) {
    let m = Model(..m, chooser: None)
    case chooser.sessions {
      True -> run_command(m, command.SwitchClient(command.Index(n)))
      False -> run_command(m, command.SelectWindow(command.Index(n)))
    }
  }
  case raw {
    "j" | "down" -> move(1)
    "k" | "up" -> move(-1)
    "enter" -> pick(chooser.cursor)
    "esc" | "q" -> #(Model(..m, chooser: None), [])
    _ ->
      case int.parse(raw) {
        Ok(n) if n < count -> pick(n)
        _ -> #(m, [])
      }
  }
}

fn help_key(m: Model, scroll: Int, raw: String) -> Step {
  case raw {
    "j" | "down" -> #(Model(..m, help: Some(scroll + 1)), [])
    "k" | "up" -> #(Model(..m, help: Some(int.max(0, scroll - 1))), [])
    "ctrl+d" | "pagedown" -> #(Model(..m, help: Some(scroll + 10)), [])
    "ctrl+u" | "pageup" -> #(
      Model(..m, help: Some(int.max(0, scroll - 10))),
      [],
    )
    _ -> #(Model(..m, help: None), [])
  }
}

fn login_key(m: Model, login: Login, raw: String) -> Step {
  case login.busy, raw {
    True, _ -> #(m, [])
    False, "esc" -> #(Model(..m, login: None), [])
    False, "tab" | False, "up" | False, "down" -> #(
      Model(..m, login: Some(Login(..login, on_password: !login.on_password))),
      [],
    )
    False, "enter" ->
      case login.on_password, login.email, login.password {
        False, _, _ -> #(
          Model(..m, login: Some(Login(..login, on_password: True))),
          [],
        )
        True, "", _ | True, _, "" -> #(say(m, "email and password, please"), [])
        True, email, password -> #(
          Model(..m, login: Some(Login(..login, busy: True))),
          [
            runtime.from_promise(
              fn() { store.login(string.trim(email), password) },
              LoggedIn,
            ),
          ],
        )
      }
    False, "backspace" -> #(
      Model(
        ..m,
        login: Some(case login.on_password {
          True -> Login(..login, password: string.drop_end(login.password, 1))
          False -> Login(..login, email: string.drop_end(login.email, 1))
        }),
      ),
      [],
    )
    False, _ ->
      case keys.printable(raw) {
        Ok(char) -> #(
          Model(
            ..m,
            login: Some(case login.on_password {
              True -> Login(..login, password: login.password <> char)
              False -> Login(..login, email: login.email <> char)
            }),
          ),
          [],
        )
        Error(Nil) -> #(m, [])
      }
  }
}

// --- the windows' own keys --------------------------------------------------------

fn page_key(m: Model, raw: String) -> Step {
  case raw, m.window {
    // Where keys are text, `?` is a `?`.
    "?", 6 -> drill_key(m, raw)
    "?", 1 if m.browse.typing -> browse_key(m, raw)
    "?", _ -> #(Model(..m, help: Some(0)), [])
    // A window number without the prefix: say how it's done, as the status
    // line lists the windows by number.
    _, window if window != 6 && !m.browse.typing ->
      case int.parse(raw) {
        Ok(n) if n >= 0 && n <= 9 -> #(say(m, window_hint(m, n)), [])
        _ -> window_key(m, raw)
      }
    _, _ -> window_key(m, raw)
  }
}

fn window_hint(m: Model, n: Int) -> String {
  let prefix = keys.tmux_name(m.prefix_key)
  case list.drop(window_names(m), n) {
    [name, ..] if n == m.window -> "this is " <> name
    [name, ..] -> prefix <> " " <> int.to_string(n) <> " opens " <> name
    [] -> "no window " <> int.to_string(n) <> ": " <> prefix <> " w lists them"
  }
}

fn window_key(m: Model, raw: String) -> Step {
  case m.window {
    0 -> study_key(m, raw)
    1 -> browse_key(m, raw)
    2 -> queue_key(m, raw)
    3 ->
      case raw {
        "g" -> load_stats(m)
        _ -> #(m, [])
      }
    5 -> settings_key(m, raw)
    6 -> drill_key(m, raw)
    _ -> #(m, [])
  }
}

fn cursor_move(cursor: Int, count: Int, raw: String) -> Result(Int, Nil) {
  let last = int.max(0, count - 1)
  case raw {
    "j" | "down" -> Ok(int.min(last, cursor + 1))
    "k" | "up" -> Ok(int.max(0, cursor - 1))
    "g" | "home" -> Ok(0)
    "G" | "end" -> Ok(last)
    "ctrl+d" | "pagedown" -> Ok(int.min(last, cursor + 10))
    "ctrl+u" | "pageup" -> Ok(int.max(0, cursor - 10))
    _ -> Error(Nil)
  }
}

fn study_key(m: Model, raw: String) -> Step {
  let refs = today(m)
  case cursor_move(m.study_cursor, list.length(refs), raw), raw {
    Ok(cursor), _ -> #(Model(..m, study_cursor: cursor), [])
    _, "enter" ->
      case refs {
        [] -> #(
          say(
            m,
            "nothing due: "
              <> keys.tmux_name(m.prefix_key)
              <> " 1 to browse and add drills, or s for a starter set",
          ),
          [],
        )
        _ -> #(start_sitting(m, refs, True), [])
      }
    _, "s" -> enqueue(m, common.starter_refs(m.shared, m.shared.active_track))
    _, "m" ->
      case held_back(m) {
        0 -> #(say(m, "nothing past today's limit: add drills in browse"), [])
        _ -> #(start_sitting(m, today_plus(m, study_more), True), [])
      }
    _, "q" -> quitting(m)
    _, _ -> #(m, [])
  }
}

fn browse_key(m: Model, raw: String) -> Step {
  let browse = m.browse
  case browse.typing {
    True ->
      case raw {
        "enter" | "esc" -> #(
          Model(..m, browse: Browse(..browse, typing: False)),
          [],
        )
        "backspace" -> #(
          Model(
            ..m,
            browse: Browse(
              ..browse,
              cursor: 0,
              filter: string.drop_end(browse.filter, 1),
            ),
          ),
          [],
        )
        _ ->
          case keys.printable(raw) {
            Ok(char) -> #(
              Model(
                ..m,
                browse: Browse(
                  ..browse,
                  cursor: 0,
                  filter: browse.filter <> char,
                ),
              ),
              [],
            )
            Error(Nil) -> #(m, [])
          }
      }
    False -> {
      let refs = browse_refs(m)
      let here = list.drop(refs, browse.cursor) |> list.first
      case cursor_move(browse.cursor, list.length(refs), raw), raw, here {
        Ok(cursor), _, _ -> #(Model(..m, browse: Browse(..browse, cursor:)), [])
        _, "/", _ -> #(Model(..m, browse: Browse(..browse, typing: True)), [])
        _, "esc", _ -> #(Model(..m, browse: Browse(0, "", False)), [])
        _, "enter", Ok(ref) -> #(start_sitting(m, [ref], False), [])
        _, "a", Ok(ref) ->
          case web.is_queued(m.shared, ref) {
            True -> #(say(m, ref.title <> " is already queued"), [])
            False -> enqueue(m, [ref])
          }
        // Everything listed, so with a `/` filter, everything it matches.
        _, "A", _ ->
          enqueue(
            m,
            list.filter(refs, fn(ref) { !web.is_queued(m.shared, ref) }),
          )
        _, _, _ -> #(m, [])
      }
    }
  }
}

fn queue_key(m: Model, raw: String) -> Step {
  let cards = queued(m)
  let here = list.drop(cards, m.queue_cursor) |> list.first
  case cursor_move(m.queue_cursor, list.length(cards), raw), raw, here {
    Ok(cursor), _, _ -> #(Model(..m, queue_cursor: cursor), [])
    _, "enter", Ok(card) -> #(start_sitting(m, [card.problem], False), [])
    _, "x", Ok(card) -> dequeue(m, card.problem)
    _, _, _ -> #(m, [])
  }
}

fn settings_key(m: Model, raw: String) -> Step {
  case raw, m.shared.mode {
    "l", web.Guest -> #(
      Model(..m, login: Some(Login("", "", False, False))),
      [],
    )
    "o", web.Account(token) -> {
      store.clear_token()
      let m = open_guest(m, m.shared.active_track) |> say("signed out")
      #(m, [
        runtime.from_promise(fn() { store.logout(token) }, fn(_) { LoggedOut }),
      ])
    }
    "n", _ -> set_limits(m, step_new(_, 5))
    "N", _ -> set_limits(m, step_new(_, -5))
    // Not `0`: a digit on its own names a window.
    "u", _ -> set_limits(m, fn(s) { wire.Settings(..s, new_per_day: no_limit) })
    "r", _ ->
      set_limits(m, fn(s) { reviews_per_day(s, s.reviews_per_day + 50) })
    "R", _ ->
      set_limits(m, fn(s) { reviews_per_day(s, s.reviews_per_day - 50) })
    _, _ -> #(m, [])
  }
}

/// A daily limit this high is no limit at all.
pub const no_limit = 1000

/// New per day, `by` more or fewer. From no limit, down is 100; at 100, up
/// is no limit again.
fn step_new(s: wire.Settings, by: Int) -> wire.Settings {
  let n = case s.new_per_day >= no_limit, by < 0 {
    True, True -> 100
    True, False -> no_limit
    False, _ ->
      case s.new_per_day + by > 100 {
        True -> no_limit
        False -> int.max(0, s.new_per_day + by)
      }
  }
  wire.Settings(..s, new_per_day: n)
}

fn reviews_per_day(s: wire.Settings, n: Int) -> wire.Settings {
  wire.Settings(..s, reviews_per_day: int.clamp(n, 0, 5000))
}

/// The track's daily limits, for a guest: kept in the guest file with the
/// track, as the web keeps them. An account's are the server's, set on the web.
fn set_limits(m: Model, change: fn(wire.Settings) -> wire.Settings) -> Step {
  case m.shared.mode {
    web.Account(_) -> #(say(m, "signed in: the limits are set on the web"), [])
    web.Guest -> {
      let settings = change(m.shared.settings)
      let tracks = list.key_set(m.guest.tracks, m.shared.active_track, settings)
      let m =
        Model(..m, guest: store.Guest(..m.guest, tracks:))
        |> save_guest
        |> open_guest(m.shared.active_track)
      #(say(m, limits_text(settings)), [])
    }
  }
}

pub fn limits_text(s: wire.Settings) -> String {
  case s.new_per_day >= no_limit {
    True -> "no limit on new"
    False -> int.to_string(s.new_per_day) <> " new"
  }
  <> " and "
  <> int.to_string(s.reviews_per_day)
  <> " reviews a day"
}

fn load_stats(m: Model) -> Step {
  let name = m.shared.active_track
  case m.shared.mode {
    web.Guest -> #(
      Model(
        ..m,
        stats: Some(
          Ok(guest.stats(
            m.guest.local,
            name,
            now(),
            store.study_day(m.guest.account),
          )),
        ),
      ),
      [],
    )
    web.Account(token) -> #(Model(..m, stats: None), [
      runtime.from_promise(fn() { store.stats(token, name) }, StatsLoaded),
    ])
  }
}

fn enqueue(m: Model, refs: List(ProblemRef)) -> Step {
  case refs, m.shared.mode {
    [], _ -> #(say(m, "nothing left to add"), [])
    _, web.Guest -> {
      let #(local, _) = guest.enqueue(m.guest.local, refs, now())
      let m = Model(..m, guest: store.Guest(..m.guest, local:))
      let m = save_guest(m) |> open_guest(m.shared.active_track)
      #(say(m, plural(list.length(refs), "drill") <> " queued"), [])
    }
    _, web.Account(token) -> #(say(m, "queueing…"), [
      runtime.from_promise(fn() { store.add_cards(token, refs) }, QueueChanged),
    ])
  }
}

fn dequeue(m: Model, ref: ProblemRef) -> Step {
  case m.shared.mode {
    web.Guest -> {
      let #(local, removed, _) = guest.dequeue(m.guest.local, [ref])
      case removed {
        [] -> #(
          say(m, "reviewed cards stay in the queue; suspend them on the web"),
          [],
        )
        _ -> {
          let m = Model(..m, guest: store.Guest(..m.guest, local:))
          let m = save_guest(m) |> open_guest(m.shared.active_track)
          #(say(m, ref.title <> " removed"), [])
        }
      }
    }
    web.Account(token) -> #(m, [
      runtime.from_promise(
        fn() { store.remove_cards(token, [ref]) },
        QueueChanged,
      ),
    ])
  }
}

fn plural(n: Int, noun: String) -> String {
  int.to_string(n)
  <> " "
  <> noun
  <> case n {
    1 -> ""
    _ -> "s"
  }
}

// --- a sitting --------------------------------------------------------------------

fn start_sitting(m: Model, refs: List(ProblemRef), studying: Bool) -> Model {
  case refs {
    [] -> m
    [first, ..] ->
      case open_problem(m, first) {
        Ok(#(p, draft)) ->
          Model(
            ..m,
            sitting: Some(Sitting(
              refs:,
              index: 0,
              studying:,
              ref: first,
              problem: p,
              draft:,
              run: web.RunIdle,
              run_id: 0,
              pane: CodePane,
              last_pane: PromptPane,
              zoomed: False,
              numbered: False,
              revealed: False,
              solution: best_solution(p),
              peeked: False,
              chosen: None,
              scroll: #(0, 0, 0),
              started_ms: sys.now_ms(),
              editing: None,
              graded: [],
              grading: False,
              done: False,
              returning: [],
              waiting: False,
            )),
            last_window: Some(m.window),
            window: 6,
          )
        Error(Nil) -> say(m, "can't find " <> first.title)
      }
  }
}

fn open_problem(m: Model, ref: ProblemRef) -> Result(#(Problem, String), Nil) {
  use p <- result.map(problems.find(ref.category, ref.subcategory, ref.title))
  let draft =
    web.assoc_get(m.shared.drafts, ref)
    |> result.lazy_or(fn() {
      option.to_result(option.map(p.check, fn(c) { c.starter }), Nil)
    })
    |> result.unwrap("")
  #(p, draft)
}

/// Next drill, or the summary after the last. `graded` is the grade just
/// recorded and the card it left, if one was.
fn advance(m: Model, graded: Option(#(fsrs.Rating, wire.CardState))) -> Model {
  advance_at(m, graded, sys.now_ms())
}

/// A card due back within this long of its grade returns to the sitting.
const comes_back_within_seconds = 3600

/// The next card at `now_ms`. A graded card due back soon joins `returning`;
/// a returning card whose time has come goes in ahead of the rest of the
/// list. With the list done and a card still to come back, the sitting waits.
fn advance_at(
  m: Model,
  graded: Option(#(fsrs.Rating, wire.CardState)),
  now_ms: Int,
) -> Model {
  case m.sitting {
    None -> m
    Some(s) -> {
      let #(done, returning) = case graded {
        Some(#(rating, card)) -> {
          let seconds = fsrs.interval_seconds(card.card, m.shared.now)
          let returning = list.filter(s.returning, fn(r) { r.0 != s.ref })
          #(
            [#(s.ref, rating, seconds), ..s.graded],
            case s.studying && seconds < comes_back_within_seconds {
              True -> [#(s.ref, now_ms + seconds * 1000), ..returning]
              False -> returning
            },
          )
        }
        None -> #(s.graded, s.returning)
      }
      let #(ready, later) = list.partition(returning, fn(r) { r.1 <= now_ms })
      let ready =
        ready
        |> list.sort(fn(a, b) { int.compare(a.1, b.1) })
        |> list.map(fn(r) { r.0 })
      let next = s.index + 1
      let refs =
        list.flatten([list.take(s.refs, next), ready, list.drop(s.refs, next)])
      case list.drop(refs, next), later {
        [ref, ..], _ ->
          case open_problem(m, ref) {
            Ok(#(p, draft)) ->
              Model(
                ..m,
                sitting: Some(
                  Sitting(
                    ..s,
                    refs:,
                    index: next,
                    ref:,
                    problem: p,
                    draft:,
                    run: web.RunIdle,
                    pane: CodePane,
                    revealed: False,
                    solution: best_solution(p),
                    peeked: False,
                    chosen: None,
                    scroll: #(0, 0, 0),
                    started_ms: sys.now_ms(),
                    editing: None,
                    graded: done,
                    grading: False,
                    returning: later,
                    waiting: False,
                  ),
                ),
              )
            Error(Nil) -> m
          }
        [], [] ->
          Model(
            ..m,
            sitting: Some(
              Sitting(
                ..s,
                graded: done,
                grading: False,
                done: True,
                returning: [],
                waiting: False,
              ),
            ),
          )
        [], _ ->
          Model(
            ..m,
            sitting: Some(
              Sitting(
                ..s,
                graded: done,
                grading: False,
                returning: later,
                waiting: True,
              ),
            ),
          )
      }
    }
  }
}

/// The waiting sitting's next card and how many milliseconds until it.
pub fn next_back(s: Sitting, now_ms: Int) -> Option(#(ProblemRef, Int)) {
  s.returning
  |> list.sort(fn(a, b) { int.compare(a.1, b.1) })
  |> list.first
  |> option.from_result
  |> option.map(fn(r) { #(r.0, int.max(0, r.1 - now_ms)) })
}

/// The clock moved on: a waiting sitting takes its card back once it's due.
pub fn tick(m: Model, now_ms: Int) -> Model {
  case m.sitting {
    Some(s) if s.waiting ->
      case next_back(s, now_ms) {
        Some(#(_, 0)) -> {
          let m = advance_at(m, None, now_ms)
          // The card opened is on the drill window, wherever the user was.
          case m.window == 6 {
            True -> m
            False ->
              say(m, "a card is back: " <> keys.tmux_name(m.prefix_key) <> " 6")
          }
        }
        _ -> m
      }
    _ -> m
  }
}

/// How often to draw with nothing pressed, so the screen keeps up with the
/// clock: a waiting sitting's countdown each second, the study and queue
/// windows' due counts each minute.
pub fn refresh_ms(m: Model) -> Option(Int) {
  case m.sitting, m.window {
    Some(Sitting(waiting: True, ..)), _ -> Some(1000)
    _, 0 | _, 2 -> Some(60_000)
    _, _ -> None
  }
}

fn drill_key(m: Model, raw: String) -> Step {
  case raw == "?" && !editor_has_keys(m) {
    True -> #(Model(..m, help: Some(0)), [])
    False -> drill_key_of(m, raw)
  }
}

fn drill_key_of(m: Model, raw: String) -> Step {
  case m.sitting {
    None -> #(m, [])
    Some(s) if s.done ->
      case raw {
        "enter" | "esc" | "q" -> #(
          Model(..m, sitting: None, window: 0, last_window: None),
          [],
        )
        _ -> #(m, [])
      }
    // Counting down to a card coming back: `n` stops waiting and ends the
    // sitting; the card stays due in the study window.
    Some(s) if s.waiting ->
      case raw {
        "n" -> #(
          with_sitting(m, fn(s) {
            Sitting(..s, waiting: False, returning: [], done: True)
          }),
          [],
        )
        "esc" -> go_to_window(m, 0)
        _ -> #(m, [])
      }
    Some(Sitting(editing: Some(e), pane: CodePane, revealed: False, ..) as s) ->
      editor_key(m, s, e, raw)
    // The editor waits behind a solution while the solutions are looked
    // through; `s` brings it back as it was.
    Some(Sitting(editing: Some(_), pane: CodePane, revealed: True, ..) as s)
      if raw == "s"
      || raw == "["
      || raw == "]"
      || raw == "j"
      || raw == "k"
      || raw == "up"
      || raw == "down"
      || raw == "pageup"
      || raw == "pagedown"
    -> sitting_key(m, s, raw)
    // A key for another pane closes the editor first, so a grade or a skip
    // never loses what was typed.
    Some(Sitting(editing: Some(_), ..)) -> {
      let #(m, effects) = close_editor(m)
      let #(m, more) = drill_key(m, raw)
      #(m, list.append(effects, more))
    }
    Some(s) if s.numbered ->
      case int.parse(raw) {
        Ok(n) -> #(
          with_sitting(m, fn(s) { select_pane(s, command.PaneIndex(n)) }),
          [],
        )
        Error(Nil) -> #(
          with_sitting(m, fn(s) { Sitting(..s, numbered: False) }),
          [],
        )
      }
    Some(s) -> sitting_key(m, s, raw)
  }
}

/// The built-in editor is up and typing goes into it.
pub fn editor_has_keys(m: Model) -> Bool {
  case m.window, m.sitting {
    6, Some(Sitting(editing: Some(_), pane: CodePane, revealed: False, ..)) ->
      True
    _, _ -> False
  }
}

/// A drill's own keys, with no editor taking them.
fn sitting_key(m: Model, s: Sitting, raw: String) -> Step {
  let quiz = s.problem.quiz
  case raw, quiz {
    "j", _ | "down", _ -> #(scroll(m, 1), [])
    "k", _ | "up", _ -> #(scroll(m, -1), [])
    "ctrl+d", _ | "pagedown", _ -> #(scroll(m, 10), [])
    "ctrl+u", _ | "pageup", _ -> #(scroll(m, -10), [])
    "tab", _ -> #(
      with_sitting(m, fn(s) { select_pane(s, command.PaneNext) }),
      [],
    )
    "esc", _ -> go_to_window(m, 0)
    "e", None -> edit(m, s)
    "E", None -> #(open_editor(m, s), [])
    "r", None -> start_run(m, s)
    "s", Some(_) -> #(
      with_sitting(m, fn(s) {
        Sitting(..s, revealed: True, peeked: True, pane: OutputPane)
      }),
      [],
    )
    "s", None -> #(with_sitting(m, fn(s) { reveal(s, !s.revealed) }), [])
    "]", None -> #(with_sitting(m, step_solution(_, 1)), [])
    "[", None -> #(with_sitting(m, step_solution(_, -1)), [])
    "n", _ -> #(advance(m, None), [])
    "a", Some(_) | "b", Some(_) | "c", Some(_) | "d", Some(_) -> #(
      with_sitting(m, fn(s) {
        Sitting(..s, chosen: Some(letter_index(raw)), pane: OutputPane)
      }),
      [],
    )
    "1", _ -> grade(m, s, fsrs.Again)
    "2", _ -> grade(m, s, fsrs.Hard)
    "3", _ -> grade(m, s, fsrs.Good)
    "4", _ -> grade(m, s, fsrs.Easy)
    _, _ -> #(m, [])
  }
}

/// The last solution is the one to aim for; the earlier ones lead up to it.
fn best_solution(p: Problem) -> Int {
  int.max(0, list.length(p.solutions) - 1)
}

fn reveal(s: Sitting, on: Bool) -> Sitting {
  Sitting(..s, revealed: on, peeked: s.peeked || on, pane: CodePane)
}

/// The next or previous solution, round the end. A hidden one shows first.
fn step_solution(s: Sitting, by: Int) -> Sitting {
  let count = int.max(1, list.length(s.problem.solutions))
  let solution = case s.revealed {
    True -> { s.solution + by + count } % count
    False -> s.solution
  }
  let #(prompt, _, output) = s.scroll
  Sitting(..reveal(s, True), solution:, scroll: #(prompt, 0, output))
}

fn letter_index(raw: String) -> Int {
  case raw {
    "a" -> 0
    "b" -> 1
    "c" -> 2
    _ -> 3
  }
}

fn scroll(m: Model, by: Int) -> Model {
  with_sitting(m, fn(s) {
    let #(prompt, code, output) = s.scroll
    let bump = fn(n) { int.max(0, n + by) }
    Sitting(..s, scroll: case s.pane {
      PromptPane -> #(bump(prompt), code, output)
      CodePane -> #(prompt, bump(code), output)
      OutputPane -> #(prompt, code, bump(output))
    })
  })
}

/// The panes as `C-b q` numbers them: reading order.
pub fn panes(s: Sitting) -> List(Pane) {
  case s.problem.check, s.problem.quiz {
    _, Some(_) -> [PromptPane, OutputPane]
    None, None -> [PromptPane, CodePane]
    Some(_), None -> [PromptPane, CodePane, OutputPane]
  }
}

fn select_pane(s: Sitting, target: command.PaneTarget) -> Sitting {
  let up = panes(s)
  let count = list.length(up)
  let index =
    list.index_map(up, fn(pane, i) { #(pane, i) })
    |> list.key_find(s.pane)
    |> result.unwrap(0)
  let at = fn(i) { list.drop(up, i) |> list.first |> result.unwrap(s.pane) }
  let to = case target {
    command.PaneNext -> at({ index + 1 } % count)
    command.PanePrevious -> at({ index - 1 + count } % count)
    command.PaneLast -> s.last_pane
    command.PaneIndex(n) -> at(n)
    // The layout: prompt down the left, code above output on the right.
    command.Toward(command.Left) -> PromptPane
    command.Toward(command.Right) ->
      case s.pane {
        PromptPane -> at(1)
        other -> other
      }
    command.Toward(command.Up) ->
      case s.pane {
        OutputPane -> CodePane
        other -> other
      }
    command.Toward(command.Down) ->
      case s.pane, list.contains(up, OutputPane) {
        CodePane, True -> OutputPane
        other, _ -> other
      }
  }
  case to == s.pane {
    True -> Sitting(..s, numbered: False)
    False ->
      Sitting(..s, pane: to, last_pane: s.pane, numbered: False, zoomed: False)
  }
}

pub fn pane_name(pane: Pane) -> String {
  case pane {
    PromptPane -> "prompt"
    CodePane -> "code"
    OutputPane -> "output"
  }
}

fn extension(language: problem.Language) -> String {
  case language {
    problem.Python -> ".py"
    problem.TypeScript -> ".ts"
    problem.Gleam -> ".gleam"
    problem.Go -> ".go"
    problem.Elixir -> ".ex"
    problem.Haskell -> ".hs"
    problem.Ruby -> ".rb"
    problem.Concept | problem.Board -> ".txt"
  }
}

/// `$VISUAL`, `$EDITOR`, else the first of the usual ones that is installed.
pub fn editor() -> Result(String, Nil) {
  sys.env("VISUAL")
  |> result.lazy_or(fn() { sys.env("EDITOR") })
  |> result.lazy_or(fn() {
    list.find(["nvim", "vim", "vi", "nano", "micro", "hx"], sys.which)
  })
}

fn edit(m: Model, s: Sitting) -> Step {
  case editor() {
    Error(Nil) -> #(open_editor(m, s), [])
    Ok(program) -> {
      let file =
        sys.temp_dir("gleamdrill-edit-")
        <> "/solution"
        <> extension(s.problem.language)
      let draft = s.draft
      #(m, [
        runtime.suspend(
          fn() {
            let _ = sys.write_file(file, draft)
            let result = case sys.run_interactive(program, file) {
              Ok(_) ->
                sys.read_file(file) |> result.replace_error("the edit was lost")
              Error(reason) -> Error(reason)
            }
            sys.remove_file(file)
            result
          },
          EditorClosed,
        ),
      ])
    }
  }
}

fn open_editor(m: Model, s: Sitting) -> Model {
  let indent = case s.problem.language {
    problem.Python -> "    "
    _ -> "  "
  }
  with_sitting(m, fn(s) {
    Sitting(
      ..s,
      editing: Some(editor.new(s.draft, indent)),
      pane: CodePane,
      revealed: False,
    )
  })
}

/// Esc closes the editor and keeps the draft; Ctrl-R keeps it and runs it,
/// with the editor still open. Everything else is the editor's.
fn editor_key(m: Model, s: Sitting, e: Editor, raw: String) -> Step {
  case raw {
    "esc" -> close_editor(m)
    // The draft is kept and the editor waits behind the solution.
    "ctrl+s" -> {
      let #(m, effects) = edited(m, editor.text(e))
      #(with_sitting(m, reveal(_, True)), effects)
    }
    "ctrl+r" -> {
      let #(m, effects) = edited(m, editor.text(e))
      let #(m, more) = case m.sitting {
        Some(s) -> start_run(m, s)
        None -> #(m, [])
      }
      #(m, list.append(effects, more))
    }
    _ -> #(
      Model(..m, sitting: Some(Sitting(..s, editing: Some(editor.key(e, raw))))),
      [],
    )
  }
}

/// Closes the built-in editor, if open, and saves what it holds as the draft.
fn close_editor(m: Model) -> Step {
  case m.sitting {
    Some(Sitting(editing: Some(e), ..)) ->
      with_sitting(m, fn(s) { Sitting(..s, editing: None) })
      |> edited(editor.text(e))
    _ -> #(m, [])
  }
}

fn edited(m: Model, text: String) -> Step {
  case m.sitting {
    None -> #(m, [])
    Some(s) if text == s.draft -> #(m, [])
    Some(s) -> {
      let ref = s.ref
      let m =
        with_sitting(m, fn(s) { Sitting(..s, draft: text) })
        |> fn(m) {
          Model(
            ..m,
            shared: web.Model(
              ..m.shared,
              drafts: web.assoc_put(m.shared.drafts, ref, text),
            ),
          )
        }
      case m.shared.mode {
        web.Guest -> {
          let local = guest.put_draft(m.guest.local, ref, text)
          #(save_guest(Model(..m, guest: store.Guest(..m.guest, local:))), [])
        }
        web.Account(token) -> #(m, [
          runtime.from_promise(
            fn() { store.put_draft(token, ref, text) },
            DraftSaved,
          ),
        ])
      }
    }
  }
}

fn start_run(m: Model, s: Sitting) -> Step {
  case s.problem.check, s.run {
    // One at a time: Gleam runs share one project directory.
    _, web.Running(_, _) -> #(say(m, "still running"), [])
    None, _ -> #(say(m, "nothing to run: s shows the solution"), [])
    Some(check), _ -> {
      let id = s.run_id + 1
      let stdout = case s.run {
        web.Ran(_, stdout) -> stdout
        _ -> ""
      }
      let language = s.problem.language
      let auth = token(m)
      let draft = s.draft
      #(
        with_sitting(m, fn(s) {
          Sitting(..s, run: web.Running(id, stdout), run_id: id)
        }),
        [
          runtime.from_promise(
            fn() { run.run(language, auth, draft, check.harness) },
            fn(state) { RunFinished(id, state) },
          ),
        ],
      )
    }
  }
}

/// The interval each grade would give, as the web's grade bar shows it.
pub fn grade_hint(m: Model, s: Sitting, rating: fsrs.Rating) -> Int {
  let card = case web.card_for(m.shared, s.ref) {
    Some(state) -> state.card
    None -> fsrs.new_card(m.shared.now)
  }
  let moment = now()
  fsrs.review(card, rating, moment, m.shared.settings.scheduler, 0.0)
  |> fsrs.interval_seconds(moment)
}

fn grade(m: Model, s: Sitting, rating: fsrs.Rating) -> Step {
  case s.grading {
    True -> #(m, [])
    False -> {
      let review =
        wire.Review(
          problem: s.ref,
          rating:,
          duration_ms: Some(sys.now_ms() - s.started_ms),
          auto_failed: False,
          revealed: s.revealed || s.peeked,
          practice: !s.studying,
          recall: False,
        )
      case m.shared.mode {
        web.Guest -> {
          let moment = now()
          let day = store.study_day(m.guest.account)
          let #(local, card) =
            guest.record(
              m.guest.local,
              m.shared.settings,
              review,
              moment,
              day.index,
              sys.random_float(),
            )
          let m =
            Model(..m, guest: store.Guest(..m.guest, local:)) |> save_guest
          let shared =
            web.Model(
              ..m.shared,
              now: moment,
              cards: common.fold_card(m.shared, m.shared.cards, card),
              // The review took the draft with it, as on the web: a card
              // that comes back starts from the starter again.
              drafts: guest.drop_draft(m.shared.drafts, s.ref),
              today: guest.today(
                local,
                m.shared.active_track,
                m.shared.settings,
                moment,
                day,
              ),
            )
          #(advance(Model(..m, shared:), Some(#(rating, card))), [])
        }
        web.Account(token) -> #(
          with_sitting(m, fn(s) { Sitting(..s, grading: True) }),
          [
            runtime.from_promise(
              fn() { store.review(token, review) },
              fn(result) { Graded(rating, result) },
            ),
          ],
        )
      }
    }
  }
}
