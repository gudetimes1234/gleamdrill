//// The tour's keys: a cursor on the contents, and stepping lessons.

import gleamdrill/page/tour/model.{type Model, Contents, Lesson}
import gleamdrill/page/tour/msg.{
  type Msg, Activated, CursorMoved, RunTicked, UserClickedBack,
  UserClickedContents, UserClickedNext, UserClickedPrev, UserFocusedEditor,
  UserToggledHelp,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub const label = "TOUR"

pub fn bindings(_shared: Shared, page: Model) -> List(Binding(Msg)) {
  let back =
    Binding(
      ["Escape", "b"],
      "back",
      "Back to the study screen",
      UserClickedBack,
    )
  let help = Binding(["?"], "keys", "This cheatsheet", UserToggledHelp)
  case page.face {
    Contents -> [
      Binding(["j", "k"], "move", "Move through the lessons", CursorMoved(1)),
      Binding(["Enter"], "open", "Open the lesson", Activated),
      back,
      help,
    ]
    Lesson(_) -> [
      Binding(["n", "l"], "next", "Next lesson", UserClickedNext),
      Binding(["p", "h"], "prev", "Previous lesson", UserClickedPrev),
      Binding(["c"], "contents", "Table of contents", UserClickedContents),
      Binding(["i", "e"], "edit", "Focus the editor", UserFocusedEditor),
      Binding(["r"], "run", "Run the program now", RunTicked),
      back,
      help,
    ]
  }
}

/// On the contents, j and k share one row; k moves up.
pub fn dispatch(shared: Shared, page: Model, key: String) -> Result(Msg, Nil) {
  case key, page.face {
    "k", Contents -> Ok(CursorMoved(-1))
    _, _ -> binding.find(bindings(shared, page), key)
  }
}
