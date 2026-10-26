//// tmux's commands, as the app understands them: what the prefix keys run,
//// and what the `C-b :` prompt parses.
////
//// The app maps tmux's nouns onto its own: a window is a screen (study,
//// browse, queue...), a pane is a region of the drill screen (or a column
//// of the browser), and a session is a track. Names and flags follow tmux
//// closely enough that `selectw -t 2`, `next`, `killp` and `switchc -n`
//// mean what a tmux hand expects.

import gleam/int
import gleam/list
import gleam/result
import gleam/string

/// A window or session to go to.
pub type Target {
  Next
  Previous
  /// The one before the current (`-l`, `last-window`).
  Last
  Index(Int)
  /// A window by its name (`study`), a session by its track slug.
  Named(String)
}

pub type Direction {
  Left
  Right
  Up
  Down
}

pub type PaneTarget {
  PaneNext
  PanePrevious
  PaneLast
  PaneIndex(Int)
  Toward(Direction)
}

pub type Command {
  SelectWindow(Target)
  ChooseWindow
  KillWindow
  SelectPane(PaneTarget)
  DisplayPanes
  /// `resize-pane -Z`: the active pane fills the window, or stops filling it.
  ZoomPane
  KillPane
  SwitchClient(Target)
  ChooseSession
  DetachClient
  CommandPrompt
  ListKeys
  /// The prefix key itself, passed to whatever has focus (C-b C-b).
  SendPrefix
  /// Keys fed to the screen as if typed, by their tmux names.
  SendKeys(List(String))
  DisplayMessage(String)
}

/// Every command's full name with its tmux aliases, for parsing and for the
/// prompt's Tab completion.
pub const names = [
  #("select-window", ["selectw"]),
  #("next-window", ["next"]),
  #("previous-window", ["prev"]),
  #("last-window", ["last"]),
  #("choose-tree", []),
  #("choose-window", []),
  #("choose-session", []),
  #("kill-window", ["killw"]),
  #("select-pane", ["selectp"]),
  #("last-pane", ["lastp"]),
  #("display-panes", ["displayp"]),
  #("resize-pane", ["resizep"]),
  #("kill-pane", ["killp"]),
  #("switch-client", ["switchc"]),
  #("detach-client", ["detach"]),
  #("command-prompt", []),
  #("list-keys", ["lsk"]),
  #("send-prefix", []),
  #("send-keys", ["send"]),
  #("display-message", ["display"]),
]

/// A command line, as typed at the prompt.
pub fn parse(line: String) -> Result(Command, String) {
  case words(line) {
    [] -> Error("no command")
    [name, ..args] -> {
      use full <- result.try(resolve_name(name))
      parse_args(full, args)
    }
  }
}

/// The command's canonical line: what `parse` reads back as the same
/// command, and what the cheatsheet shows beside each prefix key.
pub fn to_string(command: Command) -> String {
  case command {
    SelectWindow(Next) -> "next-window"
    SelectWindow(Previous) -> "previous-window"
    SelectWindow(Last) -> "last-window"
    SelectWindow(Index(n)) -> "select-window -t :=" <> int.to_string(n)
    SelectWindow(Named(name)) -> "select-window -t " <> name
    ChooseWindow -> "choose-tree -w"
    KillWindow -> "kill-window"
    SelectPane(PaneNext) -> "select-pane -t :.+"
    SelectPane(PanePrevious) -> "select-pane -t :.-"
    SelectPane(PaneLast) -> "last-pane"
    SelectPane(PaneIndex(n)) -> "select-pane -t " <> int.to_string(n)
    SelectPane(Toward(Left)) -> "select-pane -L"
    SelectPane(Toward(Right)) -> "select-pane -R"
    SelectPane(Toward(Up)) -> "select-pane -U"
    SelectPane(Toward(Down)) -> "select-pane -D"
    DisplayPanes -> "display-panes"
    ZoomPane -> "resize-pane -Z"
    KillPane -> "kill-pane"
    SwitchClient(Next) -> "switch-client -n"
    SwitchClient(Previous) -> "switch-client -p"
    SwitchClient(Last) -> "switch-client -l"
    SwitchClient(Index(n)) -> "switch-client -t " <> int.to_string(n)
    SwitchClient(Named(name)) -> "switch-client -t " <> name
    ChooseSession -> "choose-tree -s"
    DetachClient -> "detach-client"
    CommandPrompt -> "command-prompt"
    ListKeys -> "list-keys"
    SendPrefix -> "send-prefix"
    SendKeys(keys) -> string.join(["send-keys", ..keys], " ")
    DisplayMessage(text) -> "display-message \"" <> text <> "\""
  }
}

/// The one command name `typed` can complete to, for Tab at the prompt.
pub fn complete(typed: String) -> Result(String, Nil) {
  case
    names
    |> list.map(fn(entry) { entry.0 })
    |> list.filter(string.starts_with(_, typed))
  {
    [only] -> Ok(only)
    _ -> Error(Nil)
  }
}

/// A full name, an alias, or an unambiguous prefix of a full name, as tmux
/// accepts them.
fn resolve_name(name: String) -> Result(String, String) {
  let exact =
    list.find(names, fn(entry) {
      entry.0 == name || list.contains(entry.1, name)
    })
  case exact {
    Ok(entry) -> Ok(entry.0)
    Error(Nil) ->
      complete(name) |> result.replace_error("unknown command: " <> name)
  }
}

fn parse_args(name: String, args: List(String)) -> Result(Command, String) {
  case name, args {
    "select-window", ["-n"] | "next-window", [] -> Ok(SelectWindow(Next))
    "select-window", ["-p"] | "previous-window", [] ->
      Ok(SelectWindow(Previous))
    "select-window", ["-l"] | "last-window", [] -> Ok(SelectWindow(Last))
    "select-window", ["-t", target] -> Ok(SelectWindow(window_target(target)))
    "choose-tree", [] | "choose-tree", ["-w"] | "choose-window", [] ->
      Ok(ChooseWindow)
    "choose-tree", ["-s"] | "choose-session", [] -> Ok(ChooseSession)
    "kill-window", [] -> Ok(KillWindow)
    "select-pane", ["-t", ":.+"] -> Ok(SelectPane(PaneNext))
    "select-pane", ["-t", ":.-"] -> Ok(SelectPane(PanePrevious))
    "select-pane", ["-l"] | "last-pane", [] -> Ok(SelectPane(PaneLast))
    "select-pane", ["-L"] -> Ok(SelectPane(Toward(Left)))
    "select-pane", ["-R"] -> Ok(SelectPane(Toward(Right)))
    "select-pane", ["-U"] -> Ok(SelectPane(Toward(Up)))
    "select-pane", ["-D"] -> Ok(SelectPane(Toward(Down)))
    "select-pane", ["-t", target] ->
      case int.parse(strip_prefix(target, ["%", ":.", "."])) {
        Ok(n) -> Ok(SelectPane(PaneIndex(n)))
        Error(Nil) -> Error("can't find pane: " <> target)
      }
    "display-panes", [] -> Ok(DisplayPanes)
    "resize-pane", ["-Z"] -> Ok(ZoomPane)
    "kill-pane", [] -> Ok(KillPane)
    "switch-client", ["-n"] -> Ok(SwitchClient(Next))
    "switch-client", ["-p"] -> Ok(SwitchClient(Previous))
    "switch-client", ["-l"] -> Ok(SwitchClient(Last))
    "switch-client", ["-t", target] ->
      Ok(
        SwitchClient(case int.parse(strip_prefix(target, ["="])) {
          Ok(n) -> Index(n)
          Error(Nil) -> Named(target)
        }),
      )
    "detach-client", [] -> Ok(DetachClient)
    "command-prompt", [] -> Ok(CommandPrompt)
    "list-keys", [] -> Ok(ListKeys)
    "send-prefix", [] -> Ok(SendPrefix)
    "send-keys", [_, ..] -> Ok(SendKeys(args))
    "display-message", [_, ..] -> Ok(DisplayMessage(string.join(args, " ")))
    _, _ -> Error("usage: " <> name <> " " <> string.join(args, " "))
  }
}

/// `2`, `:2` and `:=2` are window 2; anything else is a window's name.
fn window_target(target: String) -> Target {
  let bare = strip_prefix(target, [":=", ":", "="])
  case int.parse(bare) {
    Ok(n) -> Index(n)
    Error(Nil) -> Named(bare)
  }
}

fn strip_prefix(text: String, prefixes: List(String)) -> String {
  case list.find(prefixes, string.starts_with(text, _)) {
    Ok(prefix) -> string.drop_start(text, string.length(prefix))
    Error(Nil) -> text
  }
}

/// A command line split into words, with "double quotes" holding spaces.
fn words(line: String) -> List(String) {
  let #(done, current, _) =
    line
    |> string.to_graphemes
    |> list.fold(#([], "", False), fn(acc, char) {
      let #(done, current, quoted) = acc
      case char, quoted {
        "\"", _ -> #(done, current, !quoted)
        " ", False | "\t", False -> #(flush(done, current), "", False)
        _, _ -> #(done, current <> char, quoted)
      }
    })
  flush(done, current) |> list.reverse
}

fn flush(done: List(String), current: String) -> List(String) {
  case current {
    "" -> done
    _ -> [current, ..done]
  }
}
