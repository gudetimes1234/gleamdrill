//// The problem browser's own state: the topic open in the middle pane, the
//// search box, the keyboard cursor, and the compare view when it is up.
//// The selection is shared: it is what a manual drill, the compare view, an
//// exam start and "add to queue" all act on.

import gleam/option.{type Option, None}
import gleamdrill/domain/compare.{type Compare}

/// Which pane holds the keyboard cursor. Three, not four: the first used to
/// choose a language, and the track switcher is where that happens now.
pub type Pane {
  SubcategoriesPane
  ProblemsPane
  SelectedPane
}

/// The TUI cursor: a focused pane plus a remembered row per pane, and a row
/// for the search results, which replace the panes while searching.
pub type Cursor {
  Cursor(
    focus: Pane,
    subcategory: Int,
    problem: Int,
    selected: Int,
    search: Int,
  )
}

pub type Model {
  Model(
    /// The topic whose problems fill the middle pane.
    subcategory: Option(String),
    search: String,
    cursor: Cursor,
    /// The selected solutions side by side, while that view is up.
    compare: Option(Compare),
  )
}

pub fn init() -> Model {
  Model(
    subcategory: None,
    search: "",
    cursor: Cursor(
      focus: SubcategoriesPane,
      subcategory: 0,
      problem: 0,
      selected: 0,
      search: 0,
    ),
    compare: None,
  )
}
