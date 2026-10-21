//// The queue manager's keys: a cursor down the rows, toggles, the bulk
//// actions and search.

import gleamdrill/domain/queue
import gleamdrill/page/queue/model.{type Model}
import gleamdrill/page/queue/msg.{
  type Msg, CursorJumped, CursorMoved, ToggledAtCursor, UserAddedAllShown,
  UserClickedBack, UserFilteredQueue, UserFocusedSearch, UserRemovedAllShown,
  UserToggledHelp,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub const label = "QUEUE"

pub fn bindings(_shared: Shared, page: Model) -> List(Binding(Msg)) {
  [
    Binding(["j", "k"], "move", "Move the cursor down / up", CursorMoved(1)),
    Binding(
      [" ", "x"],
      "toggle",
      "Add the cursor row to the queue, or take it out",
      ToggledAtCursor,
    ),
    Binding(
      ["a"],
      "add all",
      "Add every problem currently listed",
      UserAddedAllShown,
    ),
    Binding(
      ["r"],
      "remove all",
      "Remove every problem currently listed",
      UserRemovedAllShown,
    ),
    Binding(["/"], "search", "Search problems", UserFocusedSearch),
    Binding(["g"], "top", "Jump to the first row", CursorJumped(True)),
    Binding(["G"], "bottom", "Jump to the last row", CursorJumped(False)),
    Binding(["Escape"], "study", "Back to the study screen", UserClickedBack),
    Binding(["?"], "keys", "This cheatsheet", UserToggledHelp),
    ..case page.filter.status == queue.AnyStatus {
      True -> []
      False -> [
        Binding(
          ["c"],
          "clear",
          "Clear the status filter",
          UserFilteredQueue(queue.AnyStatus),
        ),
      ]
    }
  ]
}

/// j and k share one row; k is the same move the other way.
pub fn dispatch(shared: Shared, page: Model, key: String) -> Result(Msg, Nil) {
  case key {
    "k" -> Ok(CursorMoved(-1))
    _ -> binding.find(bindings(shared, page), key)
  }
}
