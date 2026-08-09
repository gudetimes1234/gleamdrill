import gleam/option.{type Option, None}

pub type Route {
  MenuRoute
  DrillRoute
}

pub type ProblemRef {
  ProblemRef(category: String, subcategory: String, title: String)
}

pub type Model {
  Model(
    route: Route,
    selected_category: Option(String),
    selected_subcategory: Option(String),
    selected: List(ProblemRef),
    problem_index: Int,
    iteration_count: Int,
    current_iteration: Int,
    draft: String,
    answer_revealed: Bool,
  )
}

pub fn default() -> Model {
  Model(
    route: MenuRoute,
    selected_category: None,
    selected_subcategory: None,
    selected: [],
    problem_index: 0,
    iteration_count: 3,
    current_iteration: 1,
    draft: "",
    answer_revealed: False,
  )
}

pub type Msg {
  UserClickedCategory(String)
  UserClickedSubcategory(String)
  UserClickedBreadcrumb(Int)
  UserToggledProblem(ProblemRef)
  UserClickedSelectAll
  UserClickedClearSelection
  UserChangedIterations(String)
  UserClickedStartDrill
  UserClickedExitDrill
  ExitConfirmed(Bool)
  UserToggledAnswer
  UserClickedNext
  UserTypedDraft(String)
  UserPressedTab(value: String, start: Int, end: Int)
}
