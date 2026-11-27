//// Line Drill's pure state: matching, narrowing between patterns, reveals,
//// and the properties that must hold for any sequence of submissions.

import gleam/list
import gleam/option.{None, Some}
import gleam/string
import gleamdrill/content/problem.{type Pattern, Blank, Given, LineNote, Pattern}
import gleamdrill/content/problems
import gleamdrill/domain/line_drill.{
  Locked, Miss, Narrowed, SlotActive, SlotBlank, SlotGiven, SlotLocked,
}
import qcheck

fn patterns_of(subcategory: String, title: String) -> List(Pattern) {
  let assert Ok(found) = problems.find("NeetCode 150", subcategory, title)
  found.patterns
}

fn reverse_list() -> List(Pattern) {
  patterns_of("Linked List", "Reverse Linked List")
}

fn rain_water() -> List(Pattern) {
  patterns_of("Two Pointers", "Trapping Rain Water")
}

fn blank_texts(pattern: Pattern) -> List(String) {
  list.filter_map(pattern.lines, fn(line) {
    case line {
      Blank(text:, ..) -> Ok(text)
      Given(_) -> Error(Nil)
    }
  })
}

fn type_all(state: line_drill.LineState, lines: List(String)) {
  list.fold(lines, state, fn(state, line) { line_drill.submit(state, line).0 })
}

/// Two made-up patterns whose first lines are the same line.
fn forked() -> List(Pattern) {
  let note = fn(id) { LineNote(id:, step: 0, pseudo: "p", hint: "h", why: "w") }
  [
    Pattern(
      slug: "two-pointers",
      name: "Two pointers",
      complexity: "",
      nudge: "",
      steps: ["Only step"],
      notes: [note(1), note(2)],
      pseudocode: "",
      lines: [
        Given("def f(xs):"),
        Blank(text: "n = len(xs)", indent: 4, step: 0, ids: [1]),
        Blank(text: "return n", indent: 4, step: 0, ids: [2]),
      ],
    ),
    Pattern(
      slug: "hash-map",
      name: "Hash map",
      complexity: "",
      nudge: "",
      steps: ["Only step"],
      notes: [note(1), note(2)],
      pseudocode: "",
      lines: [
        Given("def f(xs):"),
        Blank(text: "n = len(xs)", indent: 4, step: 0, ids: [1]),
        Blank(text: "return n * 2", indent: 4, step: 0, ids: [2]),
      ],
    ),
  ]
}

// --- normalizing --------------------------------------------------------------

pub fn normalize_collapses_whitespace_test() {
  assert line_drill.normalize("  left,   right =  0,\tn - 1  ")
    == "left, right = 0, n - 1"
}

pub fn normalize_ignores_a_trailing_semicolon_or_comma_test() {
  assert line_drill.normalize("x := 1;") == "x := 1"
  assert line_drill.normalize("[1, 2],") == "[1, 2]"
}

pub fn normalize_keeps_everything_else_test() {
  assert line_drill.normalize("left,right = 0,n-1")
    != line_drill.normalize("left, right = 0, n - 1")
}

// --- typing a pattern ---------------------------------------------------------

pub fn every_python_pilot_problem_has_patterns_test() {
  assert reverse_list() != []
  assert list.length(rain_water()) == 2
  assert list.length(patterns_of("Arrays & Hashing", "Two Sum")) == 2
}

pub fn typing_reverse_linked_list_locks_each_line_test() {
  let assert [pattern] = reverse_list()
  let lines = blank_texts(pattern)
  let state = line_drill.start([pattern])
  assert line_drill.progress(state) == #(0, list.length(lines))
  let #(done, _) =
    list.fold(lines, #(state, 0), fn(acc, line) {
      let #(state, count) = acc
      let #(state, outcome) = line_drill.submit(state, "  " <> line <> "  ")
      assert outcome == Locked
      assert line_drill.progress(state).0 == count + 1
      #(state, count + 1)
    })
  assert line_drill.complete(done)
  assert !line_drill.any_revealed(done)
  assert !line_drill.help_used(done)
  // The assembled code is the canonical solution, given lines and all.
  assert string.contains(line_drill.assembled(done), "def reverseList(head):")
  assert string.contains(
    line_drill.assembled(done),
    "        following = head.next",
  )
}

pub fn a_wrong_line_is_a_miss_and_locks_nothing_test() {
  let state = line_drill.start(reverse_list())
  let #(state, outcome) = line_drill.submit(state, "prev = None")
  assert outcome == Miss
  assert line_drill.position(state) == 0
  assert line_drill.misses_here(state) == 1
  let #(state, _) = line_drill.submit(state, "nope")
  assert line_drill.misses_here(state) == 2
}

pub fn an_empty_submit_is_not_counted_test() {
  let state = line_drill.start(reverse_list())
  let #(state, outcome) = line_drill.submit(state, "   ")
  assert outcome == Miss
  assert line_drill.misses_here(state) == 0
}

pub fn the_canonical_pattern_leads_until_typing_says_otherwise_test() {
  let state = line_drill.start(rain_water())
  let assert Ok(shown) = line_drill.displayed(state)
  assert shown.slug == "two-pointers"
  // The prefix-max pattern's first line.
  let #(state, outcome) = line_drill.submit(state, "left = []")
  assert outcome == Narrowed
  let assert Ok(shown) = line_drill.displayed(state)
  assert shown.slug == "prefix-sums"
  let assert Some(locked) = line_drill.locked_in(state)
  assert locked.slug == "prefix-sums"
}

pub fn an_ambiguous_line_keeps_both_ways_test() {
  let state = line_drill.start(forked())
  assert list.length(line_drill.current_notes(state)) == 1
  let #(state, outcome) = line_drill.submit(state, "n = len(xs)")
  assert outcome == Locked
  assert list.length(state.alive) == 2
  assert line_drill.locked_in(state) == None
  // Two different next lines: two ways from here.
  assert list.length(line_drill.current_notes(state)) == 2
  let #(state, outcome) = line_drill.submit(state, "return n * 2")
  assert outcome == Narrowed
  assert state.alive == ["hash-map"]
  assert line_drill.complete(state)
}

pub fn revealing_a_line_locks_it_as_a_reveal_test() {
  let state = line_drill.start(reverse_list())
  let state = line_drill.reveal_line(state)
  assert line_drill.position(state) == 1
  assert line_drill.any_revealed(state)
  let assert [SlotLocked(revealed: True, ..), ..] =
    line_drill.skeleton(state)
    |> list.filter(fn(slot) {
      case slot {
        SlotGiven(_) -> False
        _ -> True
      }
    })
}

pub fn a_hint_counts_as_help_but_the_explanation_does_not_test() {
  let state = line_drill.start(reverse_list())
  let #(state, _) = line_drill.submit(state, "previous = None")
  // The explanation of the line just locked is there, and free.
  let assert Some(#(0, [note])) = line_drill.explanation(state)
  assert note.id == 1
  assert !line_drill.help_used(state)
  let state = line_drill.show_note(state, hint: True)
  assert line_drill.shown_here(state) == #(True, False)
  assert line_drill.help_used(state)
  assert !line_drill.any_revealed(state)
}

pub fn choosing_a_pattern_drops_what_does_not_fit_test() {
  let state = line_drill.start(rain_water())
  let #(state, _) = line_drill.submit(state, "left, right = 0, len(height) - 1")
  assert line_drill.dropped_by(state, "prefix-sums") == 1
  assert line_drill.dropped_by(state, "two-pointers") == 0
  let state = line_drill.cycle_pick(line_drill.start(rain_water()))
  assert state.picking == Some("prefix-sums")
  let state = line_drill.cycle_pick(state)
  assert state.picking == Some("two-pointers")
  let #(typed, _) =
    line_drill.submit(
      line_drill.start(rain_water()),
      "left, right = 0, len(height) - 1",
    )
  let chosen = line_drill.choose_pattern(typed, "prefix-sums")
  assert chosen.alive == ["prefix-sums"]
  assert line_drill.position(chosen) == 0
}

pub fn blanks_are_bucketed_to_four_characters_test() {
  let state = line_drill.start(reverse_list())
  let widths =
    line_drill.skeleton(state)
    |> list.filter_map(fn(slot) {
      case slot {
        SlotActive(width:, ..) | SlotBlank(width:, ..) -> Ok(width)
        _ -> Error(Nil)
      }
    })
  assert widths != []
  assert list.all(widths, fn(width) { width % 4 == 0 && width > 0 })
  // "previous = None" is 15 characters: its box says 16.
  let assert [first, ..] = widths
  assert first == 16
}

pub fn the_step_follows_the_active_blank_test() {
  let state = line_drill.start(reverse_list())
  let assert Some(#(0, 3, _)) = line_drill.current_step(state)
  let #(state, _) = line_drill.submit(state, "previous = None")
  let assert Some(#(1, 3, "Reverse each link")) = line_drill.current_step(state)
}

pub fn detect_finds_the_pattern_being_free_typed_test() {
  let editor =
    "def trap(height):\n    left = []\n    best = 0\n    for h in height:\n"
  assert line_drill.detect(rain_water(), editor) == Some("prefix-sums")
  assert line_drill.detect(rain_water(), "def trap(height):\n") == None
  assert line_drill.detect(
      rain_water(),
      "while left < right:\n    if height[left] < height[right]:",
    )
    == Some("two-pointers")
}

// --- properties ----------------------------------------------------------------

/// Every Python pattern the catalogue has.
fn all_patterns() -> List(List(Pattern)) {
  [reverse_list(), rain_water(), patterns_of("Arrays & Hashing", "Two Sum")]
}

fn pick(items: List(a), index: Int) -> a {
  let assert Ok(item) =
    list.drop(items, index % list.length(items)) |> list.first
  item
}

/// Typing a pattern's every line, however it is spaced, completes it, and
/// the assembled code is that pattern's own code.
pub fn assembled_is_the_patterns_code_property_test() {
  use #(problem_index, pattern_index, pad) <- qcheck.given(qcheck.tuple3(
    qcheck.bounded_int(0, 50),
    qcheck.bounded_int(0, 50),
    qcheck.bounded_int(0, 3),
  ))
  let patterns = pick(all_patterns(), problem_index)
  let pattern = pick(patterns, pattern_index)
  let spaces = string.repeat(" ", pad)
  let state =
    line_drill.choose_pattern(line_drill.start(patterns), pattern.slug)
    |> type_all(
      list.map(blank_texts(pattern), fn(line) { spaces <> line <> spaces }),
    )
  assert line_drill.complete(state)
  let expected =
    pattern.lines
    |> list.map(fn(line) {
      case line {
        Given(text) -> text
        Blank(text:, indent:, ..) -> string.repeat(" ", indent) <> text
      }
    })
    |> string.join("\n")
  assert line_drill.normalize(line_drill.assembled(state))
    == line_drill.normalize(expected)
}

/// Whatever is submitted, a line only locks if some candidate alive before
/// it expected that line there; candidates only ever shrink.
pub fn submit_only_locks_expected_lines_property_test() {
  use #(problem_index, picks) <- qcheck.given(qcheck.tuple2(
    qcheck.bounded_int(0, 50),
    qcheck.list_from(qcheck.bounded_int(0, 200)),
  ))
  let patterns = pick(all_patterns(), problem_index)
  let pool = ["junk line", "", ..list.flat_map(patterns, blank_texts)]
  let _ =
    list.fold(picks, line_drill.start(patterns), fn(state, index) {
      let text = pick(pool, index)
      let before = state
      let #(after, outcome) = line_drill.submit(state, text)
      // Candidates only shrink.
      assert list.all(after.alive, fn(slug) {
        list.contains(before.alive, slug)
      })
      assert after.alive != []
      case outcome {
        Miss -> {
          assert after.typed == before.typed
          Nil
        }
        Locked | Narrowed -> {
          let at = line_drill.position(before)
          assert list.any(before.patterns, fn(pattern) {
            list.contains(before.alive, pattern.slug)
            && case blank_texts(pattern) |> list.drop(at) |> list.first {
              Ok(expected) ->
                line_drill.normalize(expected) == line_drill.normalize(text)
              Error(Nil) -> False
            }
          })
          Nil
        }
      }
      after
    })
  Nil
}
