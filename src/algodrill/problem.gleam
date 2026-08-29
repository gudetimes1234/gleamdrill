import gleam/option.{type Option}

/// Identifies one drill in the catalogue.
///
/// `category` already encodes the language ("NeetCode 150 · Python"), so this
/// is the whole key -- it is what localStorage, the server's `cards` table and
/// the scheduler all agree on.
///
/// It lives here rather than in `model` because the API layer needs it too,
/// and `model` depends on the API layer for its messages.
pub type ProblemRef {
  ProblemRef(category: String, subcategory: String, title: String)
}

pub type Language {
  Python
  Gleam
  TypeScript
  Elixir
  /// Not a programming language: a prose concept drill with nothing to compile.
  /// Used by the system design quiz, whose problems carry a Quiz instead of a
  /// Check.
  Concept
}

/// Everything needed to compile and grade an attempt in the browser. Gleam,
/// Python and TypeScript drills have one; Elixir drills do not, because no
/// browser can compile Elixir *source* — Popcorn and AtomVM run precompiled
/// BEAM bytecode, so there is nothing to hand a typed-in solution to. Elixir
/// drills are reveal-only, and are verified natively instead
/// (drills/elixir/verify_all.exs).
pub type Check {
  Check(signature: String, starter: String, harness: String)
}

/// One way of solving a problem. Every problem has at least one; some carry
/// alternates ("Solution 2 · Brute force") showing a different approach.
///
/// `note` is the prose explaining *this* approach, shown above the code when a
/// solution is revealed. It lives in drills/notes/<stem>.txt rather than as a
/// comment in the source, so the four language mirrors of one variant share a
/// single write-up instead of four hand-kept rewordings. Empty means "no note".
pub type Solution {
  Solution(label: String, note: String, code: String)
}

/// A multiple-choice question. `correct` indexes into `choices`. The distractors
/// are deliberately all plausible — every option is something the source
/// material actually discusses, because an obviously-wrong option turns a 4-way
/// question into a 2-way one and inflates the score.
pub type Quiz {
  Quiz(
    choices: List(String),
    correct: Int,
    explanation: String,
    /// Where to go read after getting it wrong, e.g. "p112-115".
    page: String,
  )
}

pub type Problem {
  Problem(
    title: String,
    prompt: String,
    approach: String,
    solutions: List(Solution),
    language: Language,
    check: Option(Check),
    quiz: Option(Quiz),
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
    Elixir -> "Elixir"
    Concept -> "Concept"
  }
}

/// Lowercase identifier used by the editor mode and the runner registry.
pub fn language_slug(language: Language) -> String {
  case language {
    Python -> "python"
    Gleam -> "gleam"
    TypeScript -> "typescript"
    Elixir -> "elixir"
    Concept -> "concept"
  }
}
