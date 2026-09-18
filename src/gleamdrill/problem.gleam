import gleam/list
import gleam/option.{type Option, None, Some}
import wire

/// Identifies one drill in the catalogue.
///
/// `category` already encodes the language ("NeetCode 150 · Python"), so this
/// is the whole key -- it is what localStorage, the server's `cards` table and
/// the scheduler all agree on.
///
/// Defined in `wire` and aliased here, because it is the one catalogue type
/// that also crosses to the server: the same three strings key the `cards`
/// table. Aliased rather than moved so the app keeps looking for it where it
/// always has. The alias is transparent, so a `wire.ProblemRef` and a
/// `problem.ProblemRef` are the same type -- but the *constructor* is only
/// `wire.ProblemRef`, which is why the handful of modules that build one
/// import it from there.
pub type ProblemRef =
  wire.ProblemRef

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
///
/// `graded` is whether a run gates the grade bar. Every problem drill is
/// graded: a later scheduled review must run once before the grades are
/// offered (the grade itself is always the user's). Ungraded checks grade
/// from the moment the card opens, like a reveal-only card.
pub type Check {
  Check(signature: String, starter: String, harness: String, graded: Bool)
}

/// One way of solving a problem, ordered worst-to-best by runtime. Every
/// problem has at least one; most carry alternates showing different
/// techniques.
///
/// `label` names the technique ("Brute Force", "Hash Map", "Nifty Python") —
/// declared by a `@kind` directive in the variant's note, falling back to the
/// old filename-derived "Solution N · Variant" scheme where not yet annotated.
/// `complexity` is the Big-O line ("O(n²) time · O(1) space") from `@big-o`;
/// empty means not yet annotated. `note` is the prose explaining *this*
/// approach, shown above the code when a solution is revealed. It lives in
/// drills/notes/<stem>.txt rather than as a comment in the source, so the four
/// language mirrors of one variant share a single write-up instead of four
/// hand-kept rewordings. Empty means "no note".
pub type Solution {
  Solution(label: String, complexity: String, note: String, code: String)
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

/// LeetCode's rating of a problem. Shown as a badge, filterable on the queue
/// screen, and what the starter set is drawn from. Its own type rather than
/// reusing `fsrs.Rating`'s Hard/Easy: those are what you press after a
/// review, this is what the problem is, and the two must never read as one.
pub type Difficulty {
  Easy
  Medium
  Hard
}

pub fn difficulty_label(difficulty: Difficulty) -> String {
  case difficulty {
    Easy -> "Easy"
    Medium -> "Medium"
    Hard -> "Hard"
  }
}

/// Lowercase form, used as a CSS class suffix and a filter chip value.
pub fn difficulty_slug(difficulty: Difficulty) -> String {
  case difficulty {
    Easy -> "easy"
    Medium -> "medium"
    Hard -> "hard"
  }
}

pub fn difficulty_from_slug(slug: String) -> Result(Difficulty, Nil) {
  case slug {
    "easy" -> Ok(Easy)
    "medium" -> Ok(Medium)
    "hard" -> Ok(Hard)
    _ -> Error(Nil)
  }
}

/// One rung of the approach hint ladder, revealed in order: a vague nudge,
/// then the plan as steps, then (for code drills) language-neutral
/// pseudocode. Revealing the pseudocode counts as seeing the answer.
///
/// `Walk` is the plan as a guided walkthrough: the steps, each with a hint
/// that points at it, a why that explains it, and its slice of the
/// pseudocode.
pub type ApproachStage {
  Nudge(String)
  Walk(List(WalkStep))
  Pseudocode(String)
}

pub type WalkStep {
  WalkStep(step: String, hint: String, why: String, code: String)
}

/// The step texts of the plan rung.
pub fn plan_steps(stage: ApproachStage) -> List(String) {
  case stage {
    Walk(steps) -> list.map(steps, fn(step) { step.step })
    Nudge(_) | Pseudocode(_) -> []
  }
}

pub type Problem {
  Problem(
    title: String,
    prompt: String,
    /// True when `prompt` is trusted HTML from the repository (the vendored
    /// language tour lessons) rather than plain text. Never set it for
    /// anything a user typed: the view renders it unescaped.
    prompt_html: Bool,
    approach: List(ApproachStage),
    solutions: List(Solution),
    language: Language,
    check: Option(Check),
    quiz: Option(Quiz),
    /// `None` for a quiz question, which has no LeetCode rating.
    difficulty: Option(Difficulty),
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

/// Whether a run gates the grade bar. Reveal-only drills (no Check) and
/// read-and-run cards (a Check with `graded: False`) grade from open.
pub fn graded(problem: Problem) -> Bool {
  case problem.check {
    Some(check) -> check.graded
    None -> False
  }
}
