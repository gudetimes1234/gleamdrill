//// The browser's keys: a cursor through three panes, or through the search
//// results while a search is up, and the compare view's own set.

import gleam/option.{None, Some}
import gleam/string
import gleamdrill/domain/compare.{LeftSide, RightSide}
import gleamdrill/page/browse/model.{type Model}
import gleamdrill/page/browse/msg.{
  type Msg, Activated, CompareMoved, ComparePickedVariant, CursorJumped,
  CursorMoved, PaneFocused, SuspendedAtCursor, UserClickedBack,
  UserClickedClearSelection, UserClickedCompare, UserClickedSelectAll,
  UserClickedStartDrill, UserClosedCompare, UserFocusedSearch, UserSearched,
  UserToggledHelp,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub fn label(page: Model) -> String {
  case page.compare {
    Some(_) -> "COMPARE"
    None -> "BROWSE"
  }
}

pub fn bindings(_shared: Shared, page: Model) -> List(Binding(Msg)) {
  let help = Binding(["?"], "keys", "This cheatsheet", UserToggledHelp)
  case page.compare, string.trim(page.search) {
    Some(_), _ -> [
      Binding(
        ["j", "k"],
        "next / prev",
        "The next or previous problem on the right",
        CompareMoved(1),
      ),
      Binding(
        ["]", "["],
        "variant",
        "The right side's next or previous solution",
        ComparePickedVariant(RightSide, 0),
      ),
      Binding(
        ["}", "{"],
        "left variant",
        "The left side's next or previous solution",
        ComparePickedVariant(LeftSide, 0),
      ),
      Binding(["Escape", "b"], "browse", "Back to Browse", UserClosedCompare),
      help,
    ]
    None, "" -> [
      Binding(["j", "k"], "move", "Move the cursor down / up", CursorMoved(1)),
      Binding(["h", "l"], "pane", "Focus the pane left / right", PaneFocused(1)),
      Binding(
        [" ", "x"],
        "select",
        "Select or deselect the cursor row",
        Activated,
      ),
      Binding(["Enter"], "open", "Descend into the cursor row", Activated),
      Binding(
        ["a"],
        "all",
        "Select every problem in the subcategory",
        UserClickedSelectAll,
      ),
      Binding(["c"], "clear", "Clear the selection", UserClickedClearSelection),
      Binding(
        ["z"],
        "pause",
        "Pause or resume the cursor row's card",
        SuspendedAtCursor,
      ),
      Binding(
        ["d"],
        "drill",
        "Start drilling the selection",
        UserClickedStartDrill,
      ),
      Binding(
        ["v"],
        "compare",
        "Compare the selected solutions side by side",
        UserClickedCompare,
      ),
      Binding(["/"], "search", "Search problems", UserFocusedSearch),
      Binding(["g"], "top", "Jump to the first row", CursorJumped(True)),
      Binding(["G"], "bottom", "Jump to the last row", CursorJumped(False)),
      Binding(["Escape"], "study", "Back to the study screen", UserClickedBack),
      help,
    ]
    None, _ -> [
      Binding(["j", "k"], "move", "Move through the results", CursorMoved(1)),
      Binding(
        ["Enter", " "],
        "select",
        "Select or deselect the result",
        Activated,
      ),
      Binding(
        ["d"],
        "drill",
        "Start drilling the selection",
        UserClickedStartDrill,
      ),
      Binding(["/"], "search", "Back to the search box", UserFocusedSearch),
      Binding(["Escape"], "clear", "Clear the search", UserSearched("")),
      help,
    ]
  }
}

/// Keys that share a row: the second of each pair goes the other way, and a
/// variant key steps from the side's current solution.
pub fn dispatch(shared: Shared, page: Model, key: String) -> Result(Msg, Nil) {
  let searching = string.trim(page.search) != ""
  case key, page.compare, searching {
    "k", None, _ -> Ok(CursorMoved(-1))
    "j", None, _ -> Ok(CursorMoved(1))
    "h", None, False -> Ok(PaneFocused(-1))
    "l", None, False -> Ok(PaneFocused(1))
    "k", Some(_), _ -> Ok(CompareMoved(-1))
    "j", Some(_), _ -> Ok(CompareMoved(1))
    // Shifted brackets arrive as braces, so the left side needs no leader.
    "]", Some(c), _ -> Ok(ComparePickedVariant(RightSide, c.variant_b + 1))
    "[", Some(c), _ -> Ok(ComparePickedVariant(RightSide, c.variant_b - 1))
    "}", Some(c), _ -> Ok(ComparePickedVariant(LeftSide, c.variant_a + 1))
    "{", Some(c), _ -> Ok(ComparePickedVariant(LeftSide, c.variant_a - 1))
    _, _, _ -> binding.find(bindings(shared, page), key)
  }
}
