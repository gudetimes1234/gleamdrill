//// Stable DOM ids, shared by each screen's renderer and the scroll effect
//// that follows its cursor -- one definition, so the cursor always scrolls
//// to the row it highlights. View vocabulary, not model state; it lives
//// under view/ so the model does not name the DOM.

import gleam/int
import gleamdrill/model.{
  type MenuPane, ProblemsPane, SelectedPane, SubcategoriesPane,
}

/// Stable row ids, shared by the menu's renderer and the scroll effect so the
/// cursor always scrolls to the row it highlights.
pub fn menu_row_id(pane: MenuPane, index: Int) -> String {
  let prefix = case pane {
    SubcategoriesPane -> "sub"
    ProblemsPane -> "prob"
    SelectedPane -> "sel"
  }
  prefix <> "-" <> int.to_string(index)
}

/// The queue screen's row ids, shared by its renderer and the scroll effect
/// for the same reason `menu_row_id` is.
pub fn queue_row_id(index: Int) -> String {
  "queue-" <> int.to_string(index)
}

/// The board chip ids, shared by its renderer and the scroll effect for the
/// same reason `queue_row_id` is.
pub fn board_chip_id(index: Int) -> String {
  "board-" <> int.to_string(index)
}
