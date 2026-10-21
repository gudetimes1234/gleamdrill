//// The problem browser: three panes under one cursor, the search override,
//// the selection, and the compare view.
////
//// The selection is shared, so every change to it goes up as a
//// `SelectionChanged`. Starting a drill, an exam, or adding the selection
//// to a queue belong to other screens and are handed to them.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/content/problems
import gleamdrill/domain/compare
import gleamdrill/model as shared_model
import gleamdrill/msg as app_msg
import gleamdrill/page/browse/model.{
  type Model, type Pane, Cursor, Model, ProblemsPane, SelectedPane,
  SubcategoriesPane,
}
import gleamdrill/page/browse/msg.{type Msg}
import gleamdrill/platform/browser
import gleamdrill/shared.{type Change, type Shared}
import gleamdrill/ui/id
import lustre/effect.{type Effect}
import wire.{ProblemRef}

pub fn init(_shared: Shared) -> #(Model, Effect(Msg), List(Change)) {
  #(model.init(), effect.none(), [])
}

pub fn update(
  shared: Shared,
  page: Model,
  msg: Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  case msg {
    msg.CursorMoved(delta) ->
      move_cursor(shared, page, fn(index, last) {
        int.clamp(index + delta, 0, last)
      })
    msg.CursorJumped(first) ->
      move_cursor(shared, page, fn(_index, last) {
        case first {
          True -> 0
          False -> last
        }
      })
    msg.PaneFocused(direction) -> focus_pane(shared, page, direction)
    msg.Activated -> activate(shared, page)
    msg.SuspendedAtCursor ->
      case cursor_ref(shared, page) {
        Ok(ref) -> hand_up(page, app_msg.UserToggledSuspend(ref))
        Error(Nil) -> none(page)
      }
    msg.UserSearched(query) -> none(Model(..page, search: query))
    msg.UserFocusedSearch -> #(page, focus(".search"), [])
    msg.UserClickedSubcategory(name) ->
      none(Model(..page, subcategory: Some(name)))
    // One crumb deep now: the track is the root, and it is changed on the
    // switcher rather than here.
    msg.UserClickedBreadcrumb -> none(Model(..page, subcategory: None))
    msg.UserToggledProblem(ref) -> toggle(shared, page, ref)
    msg.UserToggledSuspend(ref) ->
      hand_up(page, app_msg.UserToggledSuspend(ref))
    msg.UserClickedSelectAll ->
      case page.subcategory {
        Some(sub) -> {
          let track = shared.active_track
          let refs =
            problems.problems_in(track, sub)
            |> list.map(fn(p) { ProblemRef(track, sub, p.title) })
            |> list.filter(fn(ref) { !list.contains(shared.selected, ref) })
          select(page, list.append(shared.selected, refs))
        }
        None -> none(page)
      }
    msg.UserClickedClearSelection -> select(page, [])
    msg.UserChangedIterations(raw) ->
      hand_up(page, app_msg.UserChangedIterations(raw))
    msg.UserClickedStartDrill -> hand_up(page, app_msg.UserClickedStartDrill)
    msg.UserClickedStartExam -> hand_up(page, app_msg.UserClickedStartExam)
    msg.UserAddedSelectionToQueue(target) ->
      hand_up(page, app_msg.UserAddedSelectionToQueue(target))
    msg.UserClickedCompare ->
      case compare.open(shared.selected) {
        Ok(opened) -> #(Model(..page, compare: Some(opened)), effect.none(), [
          shared.Navigate(shared_model.CompareRoute),
        ])
        Error(reason) -> #(page, effect.none(), [shared.Notice(reason)])
      }
    msg.CompareMoved(delta) ->
      none(
        Model(
          ..page,
          compare: option.map(page.compare, compare.moved(_, delta)),
        ),
      )
    msg.ComparePickedVariant(side, index) ->
      none(
        Model(
          ..page,
          compare: option.map(page.compare, compare.picked(_, side, index)),
        ),
      )
    msg.UserClosedCompare -> #(Model(..page, compare: None), effect.none(), [
      shared.Navigate(shared_model.MenuRoute),
    ])
    msg.UserClickedBack -> #(page, effect.none(), [
      shared.Navigate(shared_model.StudyRoute),
    ])
    msg.UserToggledHelp -> #(page, effect.none(), [shared.ToggleHelp])
  }
}

fn none(page: Model) -> #(Model, Effect(Msg), List(Change)) {
  #(page, effect.none(), [])
}

fn hand_up(
  page: Model,
  message: app_msg.Msg,
) -> #(Model, Effect(Msg), List(Change)) {
  #(page, effect.none(), [shared.Dispatch(message)])
}

fn select(
  page: Model,
  selected: List(ProblemRef),
) -> #(Model, Effect(Msg), List(Change)) {
  #(page, effect.none(), [shared.SelectionChanged(selected)])
}

fn toggle(
  shared: Shared,
  page: Model,
  ref: ProblemRef,
) -> #(Model, Effect(Msg), List(Change)) {
  select(page, case list.contains(shared.selected, ref) {
    True -> list.filter(shared.selected, fn(r) { r != ref })
    False -> list.append(shared.selected, [ref])
  })
}

/// Whether the search box has replaced the panes.
pub fn searching(page: Model) -> Bool {
  string.trim(page.search) != ""
}

/// The rows the keyboard cursor can sit on in a pane.
type Rows {
  /// Subcategory rows *choose*.
  ChoiceRows(List(String))
  /// Problem and Selected rows *toggle* a ProblemRef.
  ToggleRows(List(ProblemRef))
}

fn rows(shared: Shared, page: Model, pane: Pane) -> Rows {
  case pane {
    SubcategoriesPane ->
      ChoiceRows(problems.subcategory_names(shared.active_track))
    ProblemsPane ->
      ToggleRows(case page.subcategory {
        Some(subcategory) ->
          problems.problems_in(shared.active_track, subcategory)
          |> list.map(fn(found) {
            ProblemRef(shared.active_track, subcategory, found.title)
          })
        None -> []
      })
    SelectedPane -> ToggleRows(shared.selected)
  }
}

fn rows_length(rows: Rows) -> Int {
  case rows {
    ChoiceRows(names) -> list.length(names)
    ToggleRows(refs) -> list.length(refs)
  }
}

/// The cursor's row in a pane, clamped into the pane's current list: lists
/// change under the cursor, and clamping on read beats chasing every
/// mutation site. The view highlights the same row.
pub fn cursor_in(shared: Shared, page: Model, pane: Pane) -> Int {
  let raw = case pane {
    SubcategoriesPane -> page.cursor.subcategory
    ProblemsPane -> page.cursor.problem
    SelectedPane -> page.cursor.selected
  }
  int.clamp(raw, 0, int.max(0, rows_length(rows(shared, page, pane)) - 1))
}

fn set_cursor(page: Model, pane: Pane, index: Int) -> Model {
  Model(..page, cursor: case pane {
    SubcategoriesPane -> Cursor(..page.cursor, subcategory: index)
    ProblemsPane -> Cursor(..page.cursor, problem: index)
    SelectedPane -> Cursor(..page.cursor, selected: index)
  })
}

fn move_cursor(
  shared: Shared,
  page: Model,
  next: fn(Int, Int) -> Int,
) -> #(Model, Effect(Msg), List(Change)) {
  case searching(page) {
    True -> {
      let hits = problems.search_refs(string.trim(page.search))
      let last = int.max(0, list.length(hits) - 1)
      let index = next(int.clamp(page.cursor.search, 0, last), last)
      #(
        Model(..page, cursor: Cursor(..page.cursor, search: index)),
        scroll_to("hit-" <> int.to_string(index)),
        [],
      )
    }
    False -> {
      let pane = page.cursor.focus
      let last = int.max(0, rows_length(rows(shared, page, pane)) - 1)
      let index = next(cursor_in(shared, page, pane), last)
      #(
        set_cursor(page, pane, index),
        scroll_to(id.menu_row_id(pane, index)),
        [],
      )
    }
  }
}

/// h/l between panes. Moving right through an unmade choice makes it: `l` on
/// a topic selects it and lands in its problems, which is how a TUI drills
/// down.
fn focus_pane(
  shared: Shared,
  page: Model,
  direction: Int,
) -> #(Model, Effect(Msg), List(Change)) {
  let order = [SubcategoriesPane, ProblemsPane, SelectedPane]
  let position =
    list.fold(list.index_map(order, fn(p, i) { #(p, i) }), 0, fn(acc, pair) {
      case pair.0 == page.cursor.focus {
        True -> pair.1
        False -> acc
      }
    })
  let target = int.clamp(position + direction, 0, 2)
  let focused = fn(page: Model, focus: Pane) {
    Model(..page, cursor: Cursor(..page.cursor, focus:))
  }
  case direction > 0, page.cursor.focus, page.subcategory {
    // Descending picks the cursor row if that level has no pick yet.
    True, SubcategoriesPane, None -> {
      let #(chosen, fx, changes) = activate(shared, page)
      #(focused(chosen, ProblemsPane), fx, changes)
    }
    True, SubcategoriesPane, Some(_) -> none(focused(page, ProblemsPane))
    _, _, _ ->
      none(
        focused(page, case list.drop(order, target) {
          [pane, ..] -> pane
          [] -> SubcategoriesPane
        }),
      )
  }
}

/// Enter or Space on the cursor row.
fn activate(
  shared: Shared,
  page: Model,
) -> #(Model, Effect(Msg), List(Change)) {
  case searching(page) {
    True -> {
      let hits = problems.search_refs(string.trim(page.search))
      case
        list.drop(hits, int.clamp(page.cursor.search, 0, list.length(hits) - 1))
      {
        [ref, ..] -> toggle(shared, page, ref)
        [] -> none(page)
      }
    }
    False -> {
      let pane = page.cursor.focus
      let index = cursor_in(shared, page, pane)
      case rows(shared, page, pane) {
        ChoiceRows(names) ->
          case list.drop(names, index) {
            [name, ..] -> none(Model(..page, subcategory: Some(name)))
            [] -> none(page)
          }
        ToggleRows(refs) ->
          case list.drop(refs, index) {
            [ref, ..] -> toggle(shared, page, ref)
            [] -> none(page)
          }
      }
    }
  }
}

/// The problem under the cursor, when the focused pane holds one.
fn cursor_ref(shared: Shared, page: Model) -> Result(ProblemRef, Nil) {
  case searching(page) {
    True -> {
      let hits = problems.search_refs(string.trim(page.search))
      case
        list.drop(hits, int.clamp(page.cursor.search, 0, list.length(hits) - 1))
      {
        [ref, ..] -> Ok(ref)
        [] -> Error(Nil)
      }
    }
    False ->
      case rows(shared, page, page.cursor.focus) {
        ToggleRows(refs) ->
          case list.drop(refs, cursor_in(shared, page, page.cursor.focus)) {
            [ref, ..] -> Ok(ref)
            [] -> Error(Nil)
          }
        ChoiceRows(_) -> Error(Nil)
      }
  }
}

fn focus(selector: String) -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.focus_element(selector)
}

fn scroll_to(row: String) -> Effect(Msg) {
  use _dispatch <- effect.from
  browser.scroll_into_view(row)
}
