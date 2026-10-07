//// The browser screen: three panes under one cursor, the search override,
//// the selection, and entering a track.

import gleam/int
import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/browser
import gleamdrill/model.{type Model, Model, StudyRoute, TracksRoute}
import gleamdrill/msg.{type Msg}
import gleamdrill/problem.{type ProblemRef}
import gleamdrill/problems
import gleamdrill/store
import gleamdrill/update/common
import gleamdrill/view/id
import lustre/effect.{type Effect}
import wire.{ProblemRef}

pub fn focus_search(m: Model) -> #(Model, Effect(Msg)) {
  #(m, common.run_effect(fn() { browser.focus_element(".search") }))
}

pub fn cursor_moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  move_cursor(m, fn(index, last) { int.clamp(index + delta, 0, last) })
}

pub fn cursor_jumped(m: Model, first: Bool) -> #(Model, Effect(Msg)) {
  move_cursor(m, fn(_index, last) {
    case first {
      True -> 0
      False -> last
    }
  })
}

pub fn clicked_subcategory(m: Model, name: String) -> #(Model, Effect(Msg)) {
  #(Model(..m, selected_subcategory: Some(name)), effect.none())
}

pub fn toggle_problem(m: Model, ref: ProblemRef) -> #(Model, Effect(Msg)) {
  #(Model(..m, selected: toggle_selection(m.selected, ref)), effect.none())
}

pub fn select_all(m: Model) -> #(Model, Effect(Msg)) {
  case m.selected_subcategory {
    Some(sub) -> {
      let cat = m.active_track
      let refs =
        problems.problems_in(cat, sub)
        |> list.map(fn(p) { ProblemRef(cat, sub, p.title) })
        |> list.filter(fn(ref) { !list.contains(m.selected, ref) })
      #(Model(..m, selected: list.append(m.selected, refs)), effect.none())
    }
    None -> #(m, effect.none())
  }
}

pub fn clear_selection(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, selected: []), effect.none())
}

pub fn searched(m: Model, query: String) -> #(Model, Effect(Msg)) {
  #(Model(..m, search: query), effect.none())
}

pub fn open_tracks(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, route: TracksRoute), effect.none())
}

fn toggle_selection(
  selected: List(ProblemRef),
  ref: ProblemRef,
) -> List(ProblemRef) {
  case list.contains(selected, ref) {
    True -> list.filter(selected, fn(r) { r != ref })
    False -> list.append(selected, [ref])
  }
}

type PaneRows {
  /// Language and subcategory rows *choose*; the payload is what clicking
  /// them would dispatch.
  ChoiceRows(List(String))
  /// Problem and Selected rows *toggle* a ProblemRef.
  ToggleRows(List(ProblemRef))
}

fn pane_rows(m: Model, pane: model.MenuPane) -> PaneRows {
  case pane {
    model.SubcategoriesPane ->
      ChoiceRows(problems.subcategory_names(m.active_track))
    model.ProblemsPane ->
      ToggleRows(case m.selected_subcategory {
        Some(subcategory) ->
          problems.problems_in(m.active_track, subcategory)
          |> list.map(fn(found) {
            ProblemRef(m.active_track, subcategory, found.title)
          })
        None -> []
      })
    model.SelectedPane -> ToggleRows(m.selected)
  }
}

fn rows_length(rows: PaneRows) -> Int {
  case rows {
    ChoiceRows(names) -> list.length(names)
    ToggleRows(refs) -> list.length(refs)
  }
}

/// The cursor index for a pane, clamped into the pane's current list — lists
/// change under the cursor (switching language shrinks the problem list), and
/// clamping on read beats chasing every mutation site.
pub fn cursor_in(m: Model, pane: model.MenuPane) -> Int {
  let raw = case pane {
    model.SubcategoriesPane -> m.nav.subcategory
    model.ProblemsPane -> m.nav.problem
    model.SelectedPane -> m.nav.selected
  }
  int.clamp(raw, 0, int.max(0, rows_length(pane_rows(m, pane)) - 1))
}

fn set_cursor(m: Model, pane: model.MenuPane, index: Int) -> Model {
  let nav = case pane {
    model.SubcategoriesPane -> model.MenuNav(..m.nav, subcategory: index)
    model.ProblemsPane -> model.MenuNav(..m.nav, problem: index)
    model.SelectedPane -> model.MenuNav(..m.nav, selected: index)
  }
  Model(..m, nav: nav)
}

pub fn searching(m: Model) -> Bool {
  string.trim(m.search) != ""
}

fn move_cursor(m: Model, next: fn(Int, Int) -> Int) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      let last = int.max(0, list.length(hits) - 1)
      let index = next(int.clamp(m.nav.search, 0, last), last)
      #(
        Model(..m, nav: model.MenuNav(..m.nav, search: index)),
        common.scroll_to("hit-" <> int.to_string(index)),
      )
    }
    False -> {
      let pane = m.nav.focus
      let last = int.max(0, rows_length(pane_rows(m, pane)) - 1)
      let index = next(cursor_in(m, pane), last)
      #(set_cursor(m, pane, index), common.scroll_to(row_id(pane, index)))
    }
  }
}

/// h/l between panes. Moving right through an unmade choice makes it: `l` on
/// a topic selects it and lands in its problems, which is how a TUI drills
/// down.
///
/// Three panes, not four: the first used to choose a language, and the track
/// switcher is where that happens now.
pub fn focus_pane(m: Model, direction: Int) -> #(Model, Effect(Msg)) {
  let order = [
    model.SubcategoriesPane,
    model.ProblemsPane,
    model.SelectedPane,
  ]
  let position =
    list.fold(list.index_map(order, fn(p, i) { #(p, i) }), 0, fn(acc, pair) {
      case pair.0 == m.nav.focus {
        True -> pair.1
        False -> acc
      }
    })
  let target = int.clamp(position + direction, 0, 2)

  case direction > 0, m.nav.focus {
    // Descending picks the cursor row if that level has no pick yet.
    True, model.SubcategoriesPane ->
      case m.selected_subcategory {
        None -> {
          let #(chosen, fx) = activate_cursor(m)
          #(
            Model(
              ..chosen,
              nav: model.MenuNav(..chosen.nav, focus: model.ProblemsPane),
            ),
            fx,
          )
        }
        Some(_) -> #(
          Model(..m, nav: model.MenuNav(..m.nav, focus: model.ProblemsPane)),
          effect.none(),
        )
      }
    _, _ -> {
      let focus = case list.drop(order, target) {
        [pane, ..] -> pane
        [] -> model.SubcategoriesPane
      }
      #(Model(..m, nav: model.MenuNav(..m.nav, focus: focus)), effect.none())
    }
  }
}

/// Enter or Space on the cursor row.
/// The ProblemRef under the menu cursor, when the focused pane holds one.
pub fn cursor_ref(m: Model) -> Result(ProblemRef, Nil) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> Ok(ref)
        [] -> Error(Nil)
      }
    }
    False ->
      case pane_rows(m, m.nav.focus) {
        ToggleRows(refs) ->
          case list.drop(refs, cursor_in(m, m.nav.focus)) {
            [ref, ..] -> Ok(ref)
            [] -> Error(Nil)
          }
        ChoiceRows(_) -> Error(Nil)
      }
  }
}

pub fn enter_track(
  m: Model,
  track: String,
  starter starter: Bool,
) -> #(Model, Effect(Msg)) {
  let m = Model(..m, active_track: track, route: StudyRoute)
  // The track's own cards, queues and settings come from a fresh load: the
  // model holds one track's at a time, and this is the moment it changes.
  let reload = effect.batch([common.save_preferences(m), store.load_state(m)])
  case starter, common.starter_refs(m, track) {
    True, [_, ..] as refs -> #(
      common.pending(m, refs),
      effect.batch([reload, store.add_to_queue(m, refs)]),
    )
    _, _ -> #(m, reload)
  }
}

pub fn activate_cursor(m: Model) -> #(Model, Effect(Msg)) {
  case searching(m) {
    True -> {
      let hits = problems.search_refs(string.trim(m.search))
      case list.drop(hits, int.clamp(m.nav.search, 0, list.length(hits) - 1)) {
        [ref, ..] -> toggle_problem(m, ref)
        [] -> #(m, effect.none())
      }
    }
    False -> {
      let pane = m.nav.focus
      let index = cursor_in(m, pane)
      case pane_rows(m, pane) {
        ChoiceRows(names) ->
          case list.drop(names, index) {
            [name, ..] -> clicked_subcategory(m, name)
            [] -> #(m, effect.none())
          }
        ToggleRows(refs) ->
          case list.drop(refs, index) {
            [ref, ..] -> toggle_problem(m, ref)
            [] -> #(m, effect.none())
          }
      }
    }
  }
}

fn row_id(pane: model.MenuPane, index: Int) -> String {
  id.menu_row_id(pane, index)
}
