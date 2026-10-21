//// The progress page's keys: a cursor through the problem lists, Enter for
//// a problem's history, and Escape out of whichever is open.

import gleam/option.{None, Some}
import gleamdrill/page/stats/model.{type Model}
import gleamdrill/page/stats/msg.{
  type Msg, Activated, CursorMoved, UserClickedBack, UserClosedDetail,
  UserToggledHelp,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub const label = "STATS"

pub fn bindings(_shared: Shared, page: Model) -> List(Binding(Msg)) {
  let help = Binding(["?"], "keys", "This cheatsheet", UserToggledHelp)
  case page.detail {
    Some(_) -> [
      Binding(["Escape"], "close", "Close the problem detail", UserClosedDetail),
      help,
    ]
    None -> [
      Binding(
        ["j", "k"],
        "move",
        "Move through the problem lists",
        CursorMoved(1),
      ),
      Binding(
        ["Enter"],
        "detail",
        "Open the problem's review history",
        Activated,
      ),
      Binding(
        ["Escape", "b"],
        "back",
        "Back to the study screen",
        UserClickedBack,
      ),
      help,
    ]
  }
}

/// j and k share one row; k is the same move the other way.
pub fn dispatch(shared: Shared, page: Model, key: String) -> Result(Msg, Nil) {
  case key, page.detail {
    "k", None -> Ok(CursorMoved(-1))
    _, _ -> binding.find(bindings(shared, page), key)
  }
}
