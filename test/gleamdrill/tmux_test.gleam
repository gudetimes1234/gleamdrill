//// tmux's layer: the prefix, the command language, the windows, the
//// sessions and the drill's panes.

import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/model
import gleamdrill/msg
import gleamdrill/page/sitting/keys as sitting_keys
import gleamdrill/page/sitting/model as sitting_model
import gleamdrill/page/sitting/msg as sitting_msg
import gleamdrill/page/sitting/panes
import gleamdrill/ui/keyboard
import gleamdrill/ui/tmux/command.{
  DisplayMessage, Index, KillPane, Named, Next, PaneIndex, PaneLast, PaneNext,
  SelectPane, SelectWindow, SendKeys, SwitchClient, Toward,
}
import gleamdrill/ui/tmux/prefix
import gleamdrill/ui/tmux/windows
import qcheck
import wire

// --- the prefix -----------------------------------------------------------------

fn press(
  m: model.Model,
  key: String,
  ctrl: Bool,
  editing: String,
) -> #(model.Model, keyboard.Step) {
  // The page's table, reduced to one key: `j` means something on the page.
  let page = fn(_, key: msg.Key) {
    case key.key {
      "j" -> Ok(msg.HelpToggled)
      _ -> Error(Nil)
    }
  }
  keyboard.step(m, msg.Key(key, ctrl, False, editing), page)
}

pub fn ctrl_b_arms_the_prefix_even_in_the_editor_test() -> Nil {
  let #(m, step) = press(model.default(), "b", True, "editor")
  assert m.prefix == model.Tmux
  assert step == keyboard.Ignore
  let #(m, step) = press(m, "2", False, "none")
  assert m.prefix == model.NoPrefix
  assert step == keyboard.Send(msg.CommandRun(SelectWindow(Index(2))))
}

pub fn escape_disarms_and_a_modifier_waits_test() -> Nil {
  let #(m, _) = press(model.default(), "b", True, "none")
  // Shift on its own is half of `:` or `?`: the prefix is still armed.
  let #(m, step) = press(m, "Shift", False, "none")
  assert m.prefix == model.Tmux
  assert step == keyboard.Ignore
  let #(m, step) = press(m, "Escape", False, "none")
  assert m.prefix == model.NoPrefix
  assert step == keyboard.Ignore
}

/// C-b C-b is send-prefix; a key the prefix table lacks is the page's.
pub fn the_prefix_falls_through_to_the_page_test() -> Nil {
  let #(m, _) = press(model.default(), "b", True, "editor")
  let #(_, step) = press(m, "b", True, "none")
  assert step == keyboard.Send(msg.CommandRun(command.SendPrefix))
  let #(m, _) = press(model.default(), "b", True, "editor")
  let #(_, step) = press(m, "j", False, "none")
  assert step == keyboard.Send(msg.HelpToggled)
}

/// The `,` leader keeps its own job: the page's keys, never tmux's.
pub fn the_leader_does_not_take_tmux_keys_test() -> Nil {
  let #(m, _) = press(model.default(), ",", False, "control")
  assert m.prefix == model.Leader
  let #(_, step) = press(m, "2", False, "control")
  assert step == keyboard.Ignore
}

/// A display-message lasts until the next key.
pub fn a_key_clears_the_message_test() -> Nil {
  let m = model.Model(..model.default(), status_message: Some("hello"))
  let #(m, _) = press(m, "x", False, "none")
  assert m.status_message == None
}

/// Escape in the command prompt closes it rather than only blurring.
pub fn escape_closes_the_prompt_test() -> Nil {
  let m =
    model.Model(
      ..model.default(),
      command_prompt: Some(model.CommandPrompt("", -1)),
    )
  let #(_, step) = press(m, "Escape", False, "input")
  assert step == keyboard.Send(msg.PromptClosed)
  let #(_, step) = press(model.default(), "Escape", False, "input")
  assert step == keyboard.Blur
}

// --- the command language -----------------------------------------------------

pub fn tmux_spellings_parse_test() -> Nil {
  assert command.parse("selectw -t 2") == Ok(SelectWindow(Index(2)))
  assert command.parse("select-window -t :=3") == Ok(SelectWindow(Index(3)))
  assert command.parse("selectw -t stats") == Ok(SelectWindow(Named("stats")))
  assert command.parse("next") == Ok(SelectWindow(Next))
  assert command.parse("killp") == Ok(KillPane)
  assert command.parse("selectp -t :.+") == Ok(SelectPane(PaneNext))
  assert command.parse("selectp -L") == Ok(SelectPane(Toward(command.Left)))
  assert command.parse("lastp") == Ok(SelectPane(PaneLast))
  assert command.parse("switchc -n") == Ok(SwitchClient(Next))
  assert command.parse("send-keys j k Enter")
    == Ok(SendKeys(["j", "k", "Enter"]))
  assert command.parse("display \"two  words\"")
    == Ok(DisplayMessage("two  words"))
  // An unambiguous prefix of a full name, as tmux allows.
  assert command.parse("resize -Z") == Ok(command.ZoomPane)
  assert command.parse("frobnicate") == Error("unknown command: frobnicate")
  // `select-` is both select-window and select-pane.
  assert command.parse("select-") == Error("unknown command: select-")
}

pub fn tab_completes_one_name_test() -> Nil {
  assert command.complete("kill-p") == Ok("kill-pane")
  assert command.complete("kill") == Error(Nil)
}

/// Every prefix key's command reads back from the line the cheatsheet
/// prints beside it.
pub fn every_prefix_binding_prints_and_parses_test() -> Nil {
  use bind <- list.each(prefix.table())
  assert command.parse(command.to_string(bind.command)) == Ok(bind.command)
}

fn word() -> qcheck.Generator(String) {
  qcheck.from_generators(qcheck.constant("a"), [
    qcheck.constant("q"),
    qcheck.constant("z"),
    qcheck.constant("-"),
  ])
  |> qcheck.list_from
  |> qcheck.map(fn(letters) { "w" <> string.concat(letters) })
}

fn a_command() -> qcheck.Generator(command.Command) {
  qcheck.from_generators(
    qcheck.map(qcheck.bounded_int(0, 9), fn(n) { SelectWindow(Index(n)) }),
    [
      qcheck.map(word(), fn(name) { SelectWindow(Named(name)) }),
      qcheck.map(qcheck.bounded_int(0, 9), fn(n) { SelectPane(PaneIndex(n)) }),
      qcheck.map(qcheck.bounded_int(0, 9), fn(n) { SwitchClient(Index(n)) }),
      qcheck.map(word(), fn(name) { SwitchClient(Named(name)) }),
      qcheck.map(qcheck.list_from(word()), fn(keys) { SendKeys(["j", ..keys]) }),
      qcheck.map(qcheck.list_from(word()), fn(words) {
        DisplayMessage(list.fold(words, "say", fn(acc, w) { acc <> " " <> w }))
      }),
      ..list.map(prefix.table(), fn(bind) { qcheck.constant(bind.command) })
    ],
  )
}

pub fn printing_then_parsing_is_the_identity_test() -> Nil {
  use generated <- qcheck.given(a_command())
  assert command.parse(command.to_string(generated)) == Ok(generated)
}

// --- windows and sessions -------------------------------------------------------

pub fn the_drill_is_a_window_only_while_it_runs_test() -> Nil {
  let names = fn(m) { list.map(windows.all(m), fn(w) { w.name }) }
  assert names(model.default())
    == ["study", "browse", "queue", "stats", "tour", "settings"]
  let drilling = model.Model(..model.default(), route: model.SummaryRoute)
  assert list.last(names(drilling)) == Ok("drill")
  let comparing = model.Model(..model.default(), route: model.CompareRoute)
  let assert Ok(here) = windows.current(comparing)
  assert here.name == "browse"
  let switching = model.Model(..model.default(), route: model.TracksRoute)
  assert windows.current(switching) == Error(Nil)
}

pub fn windows_wrap_and_match_by_name_test() -> Nil {
  let on_settings = model.Model(..model.default(), route: model.SettingsRoute)
  let assert Ok(next) = windows.resolve(on_settings, Next)
  assert next.name == "study"
  let assert Ok(previous) = windows.resolve(model.default(), command.Previous)
  assert previous.name == "settings"
  let assert Ok(browse) = windows.resolve(model.default(), Named("br"))
  assert browse.route == model.MenuRoute
  assert windows.resolve(model.default(), Index(9))
    == Error("can't find window: 9")
  assert windows.resolve(model.default(), command.Last)
    == Error("no last window")
}

pub fn sessions_are_the_tracks_in_order_test() -> Nil {
  let m = model.Model(..model.default(), active_track: "NeetCode 150")
  let tracks = windows.sessions(m)
  let assert [first, second, ..] = tracks
  assert first == "NeetCode 150"
  assert windows.resolve_session(m, Next) == Ok(second)
  assert windows.resolve_session(m, Index(0)) == Ok(first)
  assert windows.resolve_session(m, command.Last) == Error("no last client")
}

// --- panes ----------------------------------------------------------------------

fn on_a_drill() -> sitting_model.Model {
  let ref =
    wire.ProblemRef("NeetCode 150", "Arrays & Hashing", "Contains Duplicate")
  sitting_model.open_problem_view(
    model.default(),
    sitting_model.new([ref]),
    ref,
  )
}

fn drill_shared() -> model.Model {
  model.Model(..model.default(), route: model.DrillRoute)
}

pub fn the_drill_panes_read_left_to_right_test() -> Nil {
  let page = on_a_drill()
  assert panes.regions(drill_shared(), page)
    == [
      sitting_model.RailRegion,
      sitting_model.PromptRegion,
      sitting_model.EditorRegion,
      sitting_model.OutputRegion,
    ]
  let solved = sitting_model.Model(..page, panel: sitting_model.SolutionPanel)
  assert panes.active(drill_shared(), solved) == sitting_model.SolutionRegion
  // A recall card is one pane.
  let recalling = sitting_model.Model(..page, recall: True)
  assert panes.regions(drill_shared(), recalling) == []
}

pub fn the_arrows_and_o_move_the_active_pane_test() -> Nil {
  let shared = drill_shared()
  let page = on_a_drill()
  let go = fn(page, target) { panes.select(shared, page, target) }
  let up = go(page, Toward(command.Up))
  assert up.active == sitting_model.PromptRegion
  let left = go(up, Toward(command.Left))
  assert left.active == sitting_model.RailRegion
  // Nothing further left: the active pane stays.
  assert go(left, Toward(command.Left)).active == sitting_model.RailRegion
  assert go(left, PaneLast).active == sitting_model.PromptRegion
  // o wraps from the last pane to the first.
  let down = go(page, Toward(command.Down))
  assert down.active == sitting_model.OutputRegion
  assert go(down, PaneNext).active == sitting_model.RailRegion
  assert go(page, PaneIndex(1)).active == sitting_model.PromptRegion
}

/// After C-b q the next key is a pane number, or puts the numbers away.
pub fn the_key_after_display_panes_picks_test() -> Nil {
  let page = sitting_model.Model(..on_a_drill(), numbered: True)
  assert sitting_keys.dispatch(drill_shared(), page, "2")
    == Ok(sitting_msg.PanesNumberPicked(Some(2)))
  assert sitting_keys.dispatch(drill_shared(), page, "Escape")
    == Ok(sitting_msg.PanesNumberPicked(None))
}
