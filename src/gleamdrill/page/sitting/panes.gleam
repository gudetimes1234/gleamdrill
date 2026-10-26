//// tmux's panes on the code drill screen: which regions are up, which one
//// is active, and where `C-b o`, the arrows and `C-b ;` move it.
////
//// The layout this walks is the desktop one: the step rail down the left,
//// the prompt above the editor (or the solution, which takes the editor's
//// place), the note to the right of them, and the output under it all.

import gleam/list
import gleam/option.{Some}
import gleam/result
import gleamdrill/content/problem
import gleamdrill/model as shared_model
import gleamdrill/page/sitting/model.{
  type Model, type Region, EditorRegion, Model, NotePane, NoteRegion,
  OutputRegion, PromptRegion, RailRegion, SolutionPanel, SolutionRegion,
}
import gleamdrill/ui/tmux/command.{
  type Direction, type PaneTarget, Down, Left, PaneIndex, PaneLast, PaneNext,
  PanePrevious, Right, Toward, Up,
}

type Shared =
  shared_model.Model

/// The regions up now, in reading order: left to right, top to bottom,
/// which is the order C-b q numbers them. Only a code drill has panes; every
/// other screen of a sitting is one.
pub fn regions(shared: Shared, page: Model) -> List(Region) {
  case model.current_problem(page), page.recall, shared.route {
    Ok(current), False, shared_model.DrillRoute ->
      case problem.kind(current) {
        problem.CodeDrill ->
          list.flatten([
            [RailRegion],
            when(shared.prompt_open, PromptRegion),
            case page.panel {
              SolutionPanel -> [SolutionRegion]
              _ -> [EditorRegion]
            },
            when(page.slot == NotePane, NoteRegion),
            when(option.is_some(current.check), OutputRegion),
          ])
        _ -> []
      }
    _, _, _ -> []
  }
}

/// The active pane, or the main one when the active one has gone (the
/// prompt put away, the solution closed).
pub fn active(shared: Shared, page: Model) -> Region {
  let up = regions(shared, page)
  case list.contains(up, page.active) {
    True -> page.active
    False -> main(up)
  }
}

/// The pane a target names, made active. Out of range or off the edge, the
/// active pane stays, as tmux's does.
pub fn select(shared: Shared, page: Model, target: PaneTarget) -> Model {
  let up = regions(shared, page)
  let here = active(shared, page)
  let to = case target {
    PaneNext -> along(up, here, 1)
    PanePrevious -> along(up, here, -1)
    PaneLast ->
      case list.contains(up, page.last_active) {
        True -> page.last_active
        False -> here
      }
    PaneIndex(n) -> list.drop(up, n) |> list.first |> result.unwrap(here)
    Toward(direction) -> toward(up, here, direction)
  }
  case to == here {
    True -> Model(..page, active: here, numbered: False)
    False -> Model(..page, active: to, last_active: here, numbered: False)
  }
}

/// The CSS name of a region, for the drill body's `active-*` class.
pub fn name(region: Region) -> String {
  case region {
    EditorRegion -> "editor"
    PromptRegion -> "prompt"
    SolutionRegion -> "solution"
    NoteRegion -> "note"
    OutputRegion -> "output"
    RailRegion -> "rail"
  }
}

fn main(up: List(Region)) -> Region {
  case list.contains(up, SolutionRegion) {
    True -> SolutionRegion
    False -> EditorRegion
  }
}

fn along(up: List(Region), here: Region, by: Int) -> Region {
  let count = list.length(up)
  let index =
    list.index_map(up, fn(region, i) { #(region, i) })
    |> list.key_find(here)
    |> result.unwrap(0)
  list.drop(up, { index + by + count } % count)
  |> list.first
  |> result.unwrap(here)
}

/// The neighbour in a direction, on the desktop layout.
fn toward(up: List(Region), here: Region, direction: Direction) -> Region {
  let centre = main(up)
  let wanted = case direction, here {
    Left, NoteRegion -> Some(centre)
    Left, RailRegion -> option.None
    Left, _ -> Some(RailRegion)
    Right, RailRegion -> Some(centre)
    Right, PromptRegion | Right, EditorRegion | Right, SolutionRegion ->
      Some(NoteRegion)
    Right, _ -> option.None
    Up, EditorRegion | Up, SolutionRegion -> Some(PromptRegion)
    Up, OutputRegion -> Some(centre)
    Up, _ -> option.None
    Down, PromptRegion -> Some(centre)
    Down, EditorRegion | Down, SolutionRegion | Down, NoteRegion ->
      Some(OutputRegion)
    Down, _ -> option.None
  }
  case wanted {
    Some(region) ->
      case list.contains(up, region) {
        True -> region
        False -> here
      }
    option.None -> here
  }
}

fn when(up: Bool, region: Region) -> List(Region) {
  case up {
    True -> [region]
    False -> []
  }
}
