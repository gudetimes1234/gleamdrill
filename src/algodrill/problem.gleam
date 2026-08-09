import gleam/option.{type Option}

pub type Language {
  Python
  Gleam
  TypeScript
}

/// Everything needed to compile and grade an attempt in the browser. Only Gleam
/// drills have one; Python drills are reveal-only for now.
pub type Check {
  Check(signature: String, starter: String, harness: String)
}

/// One way of solving a problem. Every problem has at least one; some carry
/// alternates ("Solution 2 · Brute force") showing a different approach.
pub type Solution {
  Solution(label: String, code: String)
}

pub type Problem {
  Problem(
    title: String,
    prompt: String,
    approach: String,
    solutions: List(Solution),
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
    TypeScript -> "TypeScript"
  }
}

/// Lowercase identifier used by the editor mode and the runner registry.
pub fn language_slug(language: Language) -> String {
  case language {
    Python -> "python"
    Gleam -> "gleam"
    TypeScript -> "typescript"
  }
}
