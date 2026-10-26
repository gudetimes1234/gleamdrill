//// The terminal app's own logic: key names, tmux's prefix and command line
//// on a model, reading a runner's report, and the guest file round trip.
//// Rendering and the runners themselves are checked by driving the app in
//// tmux and by `gleam run -m runners_check`.

import fsrs
import gleam/dict
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleam/time/timestamp
import gleamdrill/domain/guest
import gleamdrill/model as web
import gleamdrill/msg
import gleamdrill_tui/app
import gleamdrill_tui/editor
import gleamdrill_tui/keys
import gleamdrill_tui/run
import gleamdrill_tui/store
import gleamdrill_tui/sys
import gleeunit
import wire

pub fn main() -> Nil {
  gleeunit.main()
}

// --- keys -----------------------------------------------------------------------

pub fn etui_keys_read_as_the_browser_test() -> Nil {
  assert keys.to_web("ctrl+b") == msg.Key("b", True, False, "none")
  assert keys.to_web("up").key == "ArrowUp"
  assert keys.to_web("enter").key == "Enter"
  assert keys.to_web("esc").key == "Escape"
  assert keys.to_web("&") == msg.Key("&", False, False, "none")
}

pub fn send_keys_spellings_read_as_etui_test() -> Nil {
  assert keys.from_web("C-b") == "ctrl+b"
  assert keys.from_web("Enter") == "enter"
  assert keys.from_web("Up") == "up"
  assert keys.from_web("Space") == " "
  assert keys.from_web("j") == "j"
  assert keys.tmux_name("ctrl+a") == "C-a"
}

// --- the prefix and the command line, on a model ------------------------------------

fn fresh() -> app.Model {
  app.new(
    store.Guest(guest.empty(), wire.default_account(), []),
    False,
    "ctrl+b",
  )
}

fn press(m: app.Model, keys: List(String)) -> app.Model {
  list.fold(keys, m, fn(m, key) { app.keypressed(m, key).0 })
}

fn typed(m: app.Model, text: String) -> app.Model {
  press(m, [":", ..string_keys(text)])
}

fn string_keys(text: String) -> List(String) {
  case text {
    "" -> []
    _ -> {
      let assert Ok(#(first, rest)) = gleam_string_pop(text)
      [first, ..string_keys(rest)]
    }
  }
}

@external(javascript, "./gleamdrill_tui_test_ffi.mjs", "pop")
fn gleam_string_pop(text: String) -> Result(#(String, String), Nil)

pub fn the_prefix_picks_a_window_test() -> Nil {
  let m = press(fresh(), ["ctrl+b", "2"])
  assert m.window == 2
  assert !m.armed
  let m = press(m, ["ctrl+b", "l"])
  assert m.window == 0
  assert m.last_window == Some(2)
}

pub fn the_prefix_is_not_tmux_s_test() -> Nil {
  assert app.default_prefix == "ctrl+a"
}

pub fn the_prefix_twice_reaches_the_editor_test() -> Nil {
  let m =
    app.new(
      store.Guest(guest.empty(), wire.default_account(), []),
      False,
      "ctrl+a",
    )
    |> app.open_guest("NeetCode 150")
    |> press(["s", "enter", "E", "end", "ctrl+a", "ctrl+a", "z"])
  let assert Some(s) = m.sitting
  assert string.starts_with(editor_text(s), "z")
  assert m.window == 6
}

pub fn escape_disarms_the_prefix_test() -> Nil {
  let m = press(fresh(), ["ctrl+b", "esc", "2"])
  assert m.window == 0
}

pub fn the_prefix_key_can_be_moved_test() -> Nil {
  let m =
    app.new(
      store.Guest(guest.empty(), wire.default_account(), []),
      False,
      "ctrl+a",
    )
  assert press(m, ["ctrl+b", "2"]).window == 0
  assert press(m, ["ctrl+a", "2"]).window == 2
}

pub fn the_command_line_runs_tmux_commands_test() -> Nil {
  let m = press(fresh(), ["ctrl+b"]) |> typed("selectw -t sta")
  assert m.prompt == Some("selectw -t sta")
  let m = press(m, ["enter"])
  assert m.window == 3
  assert m.prompt == None
  // A bad line says why, and Up brings it back.
  let m = press(m, ["ctrl+b"]) |> typed("frob") |> press(["enter"])
  assert m.message == Some("unknown command: frob")
  let m = press(m, ["ctrl+b", ":", "up"])
  assert m.prompt == Some("frob")
}

pub fn tab_completes_the_command_test() -> Nil {
  let m = press(fresh(), ["ctrl+b"]) |> typed("kill-p") |> press(["tab"])
  assert m.prompt == Some("kill-pane ")
}

pub fn list_keys_opens_and_any_key_closes_test() -> Nil {
  let m = press(fresh(), ["ctrl+b", "?"])
  assert m.help == Some(0)
  assert press(m, ["j"]).help == Some(1)
  assert press(m, ["x"]).help == None
}

pub fn detach_quits_test() -> Nil {
  assert press(fresh(), ["ctrl+b", "d"]).quit
}

pub fn the_window_chooser_picks_by_number_test() -> Nil {
  let m = press(fresh(), ["ctrl+b", "w"])
  assert m.chooser == Some(app.Chooser(False, 0))
  let m = press(m, ["4"])
  assert m.window == 4
  assert m.chooser == None
}

pub fn send_keys_types_into_the_app_test() -> Nil {
  let m =
    press(fresh(), ["ctrl+b"]) |> typed("send-keys C-b 5") |> press(["enter"])
  assert m.window == 5
}

// --- the built-in editor ----------------------------------------------------------

fn typing(e: editor.Editor, keys: List(String)) -> editor.Editor {
  list.fold(keys, e, editor.key)
}

pub fn the_editor_types_and_indents_test() -> Nil {
  let e =
    editor.new("", "    ")
    |> typing(["d", "e", "f", " ", "f", "(", ")", ":", "enter", "x"])
  assert editor.text(e) == "def f():\n    x"
  // Backspace in the indent takes a whole level, then joins the lines.
  let e = typing(e, ["left", "backspace", "backspace"])
  assert editor.text(e) == "def f():x"
  assert e.col == 8
}

pub fn the_editor_moves_and_clamps_test() -> Nil {
  let e = editor.new("long line\nab", "  ") |> typing(["end", "down"])
  assert #(e.row, e.col) == #(1, 2)
  let e = typing(e, ["up", "home", "delete"])
  assert editor.text(e) == "ong line\nab"
  // Off the end of a line is the start of the next.
  let e = typing(e, ["end", "right", "ctrl+k"])
  assert editor.text(e) == "ong line\n"
}

pub fn a_paste_goes_in_whole_test() -> Nil {
  let e =
    editor.new("ab", "  ")
    |> typing(["right"])
    |> editor.paste("1\n\t2\r\n3")
  assert editor.text(e) == "a1\n  2\n3b"
  assert #(e.row, e.col) == #(2, 1)
}

pub fn the_editor_keeps_the_cursor_mid_pane_test() -> Nil {
  let e = editor.new("1\n2\n3\n4\n5\n6\n7\n8\n9\n10", "  ")
  assert editor.top(e, 4) == 0
  assert editor.top(typing(e, ["down", "down", "down", "down"]), 4) == 2
  assert editor.top(typing(e, ["pagedown"]), 4) == 6
  assert editor.top(e, 20) == 0
}

/// A guest on the Python track, as `load` leaves one.
fn drilling() -> app.Model {
  app.open_guest(fresh(), "NeetCode 150")
}

pub fn the_built_in_editor_saves_the_draft_test() -> Nil {
  let m = press(drilling(), ["s", "enter"])
  assert m.window == 6
  let assert Some(s) = m.sitting
  let starter = s.draft
  let m = press(m, ["E", "x", "1"])
  let assert Some(app.Sitting(editing: Some(_), ..)) = m.sitting
  // Typed keys are the editor's, not grades, until Esc.
  assert m.window == 6
  let m = press(m, ["esc"])
  let assert Some(s) = m.sitting
  assert s.editing == None
  assert s.draft == "x1" <> starter
  assert list.key_find(m.guest.local.drafts, s.ref) == Ok("x1" <> starter)
}

pub fn a_skip_from_another_pane_keeps_the_edit_test() -> Nil {
  let m = press(drilling(), ["s", "enter", "E", "y", "ctrl+b", "o"])
  let assert Some(s) = m.sitting
  let ref = s.ref
  let starter = string.drop_start(editor_text(s), 1)
  let m = press(m, ["n"])
  assert list.key_find(m.guest.local.drafts, ref) == Ok("y" <> starter)
}

fn editor_text(s: app.Sitting) -> String {
  let assert Some(e) = s.editing
  editor.text(e)
}

// --- ? and the window numbers -------------------------------------------------------

pub fn question_mark_alone_opens_the_help_test() -> Nil {
  assert press(fresh(), ["?"]).help == Some(0)
  // Where keys are text, it is text.
  let m = press(drilling(), ["s", "enter", "E", "?"])
  assert m.help == None
  let assert Some(app.Sitting(editing: Some(e), ..)) = m.sitting
  assert string.starts_with(editor.text(e), "?")
  assert press(fresh(), ["ctrl+b", ":", "?"]).prompt == Some("?")
}

pub fn a_window_number_alone_says_to_use_the_prefix_test() -> Nil {
  let m = press(fresh(), ["1"])
  assert m.window == 0
  assert m.message == Some("C-b 1 opens browse")
}

// --- the solutions -----------------------------------------------------------------

/// A sitting on a drill with more than one reference solution.
fn on_several_solutions() -> app.Model {
  let m = press(drilling(), ["s", "enter"])
  let assert Some(s) = m.sitting
  case list.length(s.problem.solutions) > 1 {
    True -> m
    False ->
      press(m, ["n"])
      |> fn(next) {
        let assert Some(s) = next.sitting
        assert list.length(s.problem.solutions) > 1
        next
      }
  }
}

pub fn brackets_step_round_the_solutions_test() -> Nil {
  let m = on_several_solutions()
  let assert Some(s) = m.sitting
  let count = list.length(s.problem.solutions)
  assert s.solution == count - 1
  let m = press(m, ["]"])
  let assert Some(s) = m.sitting
  // A hidden solution shows first; the next press moves on, round the end.
  assert s.revealed
  assert s.solution == count - 1
  let assert Some(s) = press(m, ["]"]).sitting
  assert s.solution == 0
  let assert Some(s) = press(m, ["["]).sitting
  assert s.solution == count - 2
}

pub fn a_hidden_solution_still_counts_as_seen_test() -> Nil {
  let m = press(drilling(), ["s", "enter", "s", "s"])
  let assert Some(s) = m.sitting
  assert !s.revealed
  assert s.peeked
}

pub fn ctrl_s_looks_at_the_solution_and_s_comes_back_test() -> Nil {
  let m = press(drilling(), ["s", "enter", "E", "z", "ctrl+s"])
  let assert Some(s) = m.sitting
  assert s.revealed
  assert string.starts_with(s.draft, "z")
  // `]` looks on without closing the editor; `s` returns to it.
  let m = press(m, ["]", "s", "q"])
  let assert Some(s) = m.sitting
  assert !s.revealed
  assert string.starts_with(editor_text(s), "zq")
}

// --- a runner's report ------------------------------------------------------------

fn exit(stdout: String) -> sys.Exit {
  sys.Exit(code: 0, stdout:, stderr: "", timed_out: False)
}

pub fn the_last_line_is_the_report_test() -> Nil {
  let report =
    "{\"cases\":[{\"label\":\"a\",\"expected\":\"1\",\"actual\":\"1\",\"passed\":true}],\"stdout\":\"\",\"error\":null}"
  let state =
    run.from_exit(exit("hello from the solution\n" <> report), fn(_) {
      web.RunIdle
    })
  assert state
    == web.Ran(
      web.Cases([web.CaseResult("a", "1", "1", True)]),
      "hello from the solution",
    )
  assert web.run_passed(state)
}

pub fn an_error_report_keeps_its_line_test() -> Nil {
  let report =
    "{\"cases\":[],\"stdout\":\"\",\"error\":{\"phase\":\"run\",\"line\":3,\"message\":\"boom\"}}"
  let assert web.Ran(web.Errored(error), _) =
    run.from_exit(exit(report), fn(_) { web.RunIdle })
  assert error.line == Some(3)
  assert error.message == "boom"
}

pub fn a_kill_is_a_timeout_test() -> Nil {
  let state =
    run.from_exit(
      sys.Exit(code: -1, stdout: "", stderr: "", timed_out: True),
      fn(_) { web.RunIdle },
    )
  assert state == web.Ran(web.TimedOut, "")
}

pub fn no_report_is_the_compilers_turn_test() -> Nil {
  let state =
    run.from_exit(
      sys.Exit(
        code: 1,
        stdout: "",
        stderr: "error: Unknown variable",
        timed_out: False,
      ),
      run.gleam_compile_error,
    )
  let assert web.Ran(web.Errored(error), _) = state
  assert error.phase == "compile"
}

pub fn gleam_errors_point_at_the_solution_line_test() -> Nil {
  let text =
    "  Compiling drill\nerror: Unknown variable\n  ┌─ /cache/gleam-run/src/solution.gleam:7:3\n  │\n7 │   nmus\n"
  let assert web.Ran(web.Errored(error), _) = run.gleam_compile_error(text)
  assert error.line == Some(7)
}

// --- the guest file -----------------------------------------------------------------

pub fn the_guest_file_round_trips_test() -> Nil {
  let ref = wire.ProblemRef("NeetCode 150", "Arrays & Hashing", "Two Sum")
  let now = timestamp.from_unix_seconds(1_800_000_000)
  let #(local, _) = guest.enqueue(guest.empty(), [ref], now)
  let review =
    wire.Review(
      problem: ref,
      rating: fsrs.Good,
      duration_ms: Some(30_000),
      auto_failed: False,
      revealed: False,
      practice: False,
      recall: False,
    )
  let #(local, card) =
    guest.record(local, wire.default_settings(), review, now, 20_000, 0.5)
  let local = guest.put_draft(local, ref, "def twoSum(): pass")
  let saved = store.Guest(local, wire.default_account(), [])
  let assert Ok(loaded) = store.decode_guest(store.encode_guest(saved, now))
  assert dict.get(loaded.local.cards, ref) == Ok(card)
  assert loaded.local.drafts == [#(ref, "def twoSum(): pass")]
  assert list.length(loaded.local.log) == 1
}

pub fn a_file_that_is_not_an_export_is_refused_test() -> Nil {
  assert store.decode_guest("{\"hello\": 1}") == Error(Nil)
  assert store.decode_guest("not json") == Error(Nil)
}

// --- the daily limit and the live queue ---------------------------------------------

pub fn m_studies_past_the_daily_limit_test() -> Nil {
  let m = press(drilling(), ["s"])
  assert list.length(app.today(m)) == 5
  assert app.held_back(m) > 0
  let m = press(m, ["m"])
  let assert Some(s) = m.sitting
  assert list.length(s.refs) == 5 + app.study_more
}

pub fn the_settings_keys_change_the_new_limit_test() -> Nil {
  let m = press(drilling(), ["s", "ctrl+b", "5", "n"])
  assert m.shared.settings.new_per_day == 10
  assert list.length(app.today(m)) == 10
  let m = press(m, ["u"])
  assert m.shared.settings.new_per_day == app.no_limit
  assert app.held_back(m) == 0
  // Kept with the track, as the guest file keeps it.
  assert list.key_find(m.guest.tracks, "NeetCode 150") == Ok(m.shared.settings)
  assert press(m, ["N"]).shared.settings.new_per_day == 100
}

pub fn capital_a_queues_everything_shown_test() -> Nil {
  let m = press(drilling(), ["ctrl+b", "1", "/", "t", "w", "o", "enter", "A"])
  let shown = app.browse_refs(m)
  assert shown != []
  assert list.all(shown, web.is_queued(m.shared, _))
  assert dict.size(m.shared.cards) == list.length(shown)
}

/// A study sitting of one queued drill.
fn studying_one() -> app.Model {
  press(drilling(), ["ctrl+b", "1", "a", "ctrl+b", "0", "enter"])
}

pub fn a_card_graded_again_comes_back_in_the_sitting_test() -> Nil {
  let m = studying_one()
  let assert Some(first) = m.sitting
  assert list.length(first.refs) == 1
  let m = press(m, ["1"])
  let assert Some(s) = m.sitting
  // Due back in a minute or so: the sitting waits for it rather than ending.
  assert s.waiting
  assert !s.done
  let assert Some(#(ref, ms)) = app.next_back(s, sys.now_ms())
  assert ref == first.ref
  assert ms > 0
  // Not yet.
  let assert Some(s) = app.tick(m, sys.now_ms()).sitting
  assert s.waiting
  // Its time: the card is back.
  let m = app.tick(m, sys.now_ms() + ms + 1000)
  let assert Some(s) = m.sitting
  assert !s.waiting
  assert s.ref == first.ref
  assert s.index == 1
  // `n` while waiting ends the sitting.
  let assert Some(s) = press(press(studying_one(), ["1"]), ["n"]).sitting
  assert s.done
}

pub fn a_card_graded_easy_does_not_come_back_test() -> Nil {
  let assert Some(s) = press(studying_one(), ["4"]).sitting
  assert s.done
  assert s.returning == []
}

pub fn a_card_back_in_the_sitting_starts_from_the_starter_test() -> Nil {
  let m = press(studying_one(), ["E", "x", "esc"])
  let assert Some(s) = m.sitting
  let ref = s.ref
  let starter = string.drop_start(s.draft, 1)
  assert s.draft == "x" <> starter
  let m = press(m, ["1"])
  assert list.key_find(m.shared.drafts, ref) == Error(Nil)
  let assert Some(waiting) = m.sitting
  let assert Some(#(_, ms)) = app.next_back(waiting, sys.now_ms())
  let assert Some(s) = app.tick(m, sys.now_ms() + ms + 1000).sitting
  assert s.ref == ref
  assert s.draft == starter
}
