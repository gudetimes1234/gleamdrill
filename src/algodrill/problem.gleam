import gleam/option.{type Option}

pub type Language {
  Python
  Gleam
}

/// Everything needed to compile and grade an attempt in the browser. Only Gleam
/// drills have one; Python drills are reveal-only for now.
pub type Check {
  Check(signature: String, starter: String, harness: String)
}

pub type Problem {
  Problem(
    title: String,
    prompt: String,
    solution: String,
    language: Language,
    check: Option(Check),
  )
}

pub type Subcategory {
  Subcategory(name: String, problems: List(Problem))
}

pub type Category {
  Category(name: String, subcategories: List(Subcategory))
}

pub fn language_label(language: Language) -> String {
  case language {
    Python -> "Python"
    Gleam -> "Gleam"
  }
}
