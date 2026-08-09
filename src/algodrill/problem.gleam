pub type Language {
  Python
  Gleam
}

pub type Problem {
  Problem(title: String, prompt: String, solution: String, language: Language)
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
