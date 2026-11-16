# PRD: Line Drill + pattern-aware line hints for GleamDrill

## Context

Today a GleamDrill drill is free-typed: you get a blank editor and a step rail (each step has a hint, a why and a code slice, from `drills/approaches/<slug>.txt`). Then you run the harness and grade yourself with FSRS. For a card you've never solved, or one you just lapsed on, a blank editor is too big a jump. AlgoDrill's hero (screenshot) shows the missing rung: the solution appears as a column of indented blanks. You type it line by line, each correct line locks in, a card explains each line once you've got it right, and a bar shows "5 of 8 blanks complete".

This PRD adds that rung as **Line Drill**. It also replaces the step rail's content with **line hints for each pattern**:

- Every problem gets a canonical solution for **each pattern it can be solved with** (Trapping Rain Water: two pointers, prefix/suffix max, monotonic stack).
- Each pattern is written once as pseudocode. Every pseudocode line has a hint and a why.
- Each language has its own pattern solutions, whose lines point back at the pseudocode lines.
- A problem stays **one card**. Whichever pattern you start typing, the hints follow you ("you started a binary search, so the rest is…").

Decisions already made with the user:

| Topic | Decision |
|---|---|
| Scheduling | Learning rung: new and relearning cards open in Line Drill, Review-state cards open free-typed. Graded and scheduled as usual, logged as assisted. |
| Matching | Normalized exact: collapse whitespace, ignore trailing `;`/`,`. Otherwise the text must match. |
| Hints | Remove the current step hint/why/code layers. Every line gets **hint + why**. Step titles stay, only as group headers. As in AlgoDrill, a line's hint and why show automatically once that line locks, as a free explanation. Asking for them before typing the line is still available, folded, and counts as help. |
| Patterns | One canonical solution per problem and pattern: pseudocode first, then one per language in the track. |
| Cards | One card per problem. The matcher works out which pattern you're following, and the hints and blanks adapt. |
| Grading | The learner always picks the grade. A Line Drill pass offers every grade, including Easy. The app never caps or overrides it. |
| Rollout | Python NeetCode 150 first. Other languages keep today's drill until their pattern files exist. |

## Step 0: Clone and branch

```sh
gh repo clone gudetimes1234/gleamdrill ~/github/gleamdrill
cd ~/github/gleamdrill && git switch -c line-drill
make check-versions && make build && make verify   # baseline green
```

## User experience

**Entry.**
- A card whose FSRS state is New or Relearning opens in Line Drill. Review-state cards open free-typed.
- Pressing `l` toggles the mode on any code drill. This follows "never take a button away".
- The status bar shows `LINE` and lists the keys, as every mode does.

**Layout (desktop).** It mirrors the screenshot.
- The left column has the given lines (signature, helper class, imports, and lines that are only closing punctuation). Below them are the blanks, indented, each box sized roughly to the expected line length (rounded to 4-char buckets so the width doesn't give the answer away).
- Locked-in lines are syntax-highlighted inside a subtle outline. The active blank holds a one-line input.
- The right panel has:
  - a progress bar and "N of M blanks complete"
  - "Step k of K · <step title>"
  - a line card for the line you just locked: `Line n`, its **Hint** and **Why this works**, shown open. This is the explanation, and it's free.
  - for the active blank, **Hint** (`h`) and **Why** (`y`), both folded until asked for. Opening either counts as help.
  - **Reveal line** (`c`, "logged as a reveal")

**Typing a line.**
- `Enter` submits.
- If it matches a candidate's expected line, the line locks and focus moves to the next blank. A "Line correct · Line n recalled" toast appears, and the line card switches to that line's hint and why.
- If it misses, the box shakes, the miss count goes up, and the input stays. After 3 misses, the line card shows "Reveal line" in a stronger style. It is always available.
- `Esc` blurs, as in the existing editor.

**Pattern adapting** (one card, many patterns).
- Every pattern for the problem in this language is a candidate. A submitted line is checked against the expected next line of **each** candidate still alive, and candidates that don't match are dropped.
- While more than one candidate is alive:
  - The blanks show the skeleton of the primary pattern (canonical, `@order` last).
  - The line card shows "2 ways from here" with each candidate's hint labelled by its pattern name.
- When one candidate remains, the pattern **locks**. The skeleton re-renders for that pattern and the panel says "You're writing: Two pointers".
- If a line matches a non-primary pattern, the skeleton switches to that pattern.
- `p` cycles to an explicit pattern choice. That throws away typed lines that don't fit it, after a confirm in the status bar, not a modal.

**Completion.**
- When the last blank locks, the assembled code (given lines plus typed lines) is auto-run against the existing harness with a `TestRun`.
- The result goes into the existing `AwaitingGrade` flow and grade buttons, with intervals.
- The Solution pane still shows every pattern's full solution.

**Phone.** Line Drill lives in the Code panel. The line card sits directly under the active blank, so the Problem panel stays the problem.

**Free-type mode.** The rail is rebuilt on the same data:
- a pattern picker (auto-selected by running the same matcher over the editor's lines, best effort)
- that pattern's lines, folded, each with hint, why and code (code logged as a reveal)
- the "show the whole thing" pseudocode reveal stays

## Content model

**Pattern vocabulary.** Add a new file, `drills/patterns/VOCAB`, with fixed slugs and display names: hash-map, two-pointers, sliding-window, prefix-sums, monotonic-stack, binary-search, linked-list-pointers, fast-slow-pointers, bfs, dfs, backtracking, heap, trie, union-find, topological-sort, intervals, greedy, dp-1d, dp-2d, bit-manipulation, math. The generator rejects unknown slugs. Brute force is **not** a pattern. Existing brute-force solutions stay as reference solutions in the Solution pane, but not in Line Drill.

**Pseudocode with line prose.** One file per problem, `drills/patterns/<slug>.txt`. It replaces `drills/approaches/<slug>.txt` once a language is fully ported.

```
== pattern two-pointers
complexity: O(n) time · O(1) space
nudge: The water over any bar is bounded by the shorter of the tallest walls on each side...
-- step Start at both walls
1 left, right = 0, n - 1
  hint: Where do the two pointers start?
  why: At both ends; whichever wall is shorter bounds the water on its side.
2 left_max = right_max = 0
  hint: ...
  why: ...
-- step Move the shorter side inward
3 while left < right:
  ...
== pattern prefix-sums
...
```

**Language solutions tagged to pseudocode lines.**
- These are the existing solution files, so `make verify` keeps running them: `drills/python/solutions/nc24_trapping_rain_water__two_pointers.py`.
- The existing notes file gets `@pattern two-pointers` beside `@kind`, `@big-o` and `@order`.
- Each line that should be a blank gets a trailing tag in the language's comment syntax: `# @3` or `// @3`. Several language lines may share one tag, and one line may tag `@3,4`.
- Untagged code lines are **given**. Full-line comments are dropped from Line Drill. The generator strips the tags from every displayed copy of the code.

**Generator** (`drills/src/generate.gleam`, next to `generate_approaches`, which is around lines 1296–1390). Emit `generated/patterns.gleam`. Fail the build when:
- a pattern slug is unknown
- a pseudocode line is missing its hint or why
- a tag points at a line that doesn't exist
- a pseudocode line is never tagged by a language file that claims the pattern
- a solution claims `@pattern` but has no tags

`approach_census` gains per-language pattern coverage.

**Types** (`src/gleamdrill/content/problem.gleam`):

```gleam
pub type Pattern {
  Pattern(slug: String, name: String, complexity: String, nudge: String,
          steps: List(String), lines: List(PatternLine))
}
pub type PatternLine {
  Given(text: String)
  Blank(text: String, indent: Int, step: Int, notes: List(LineNote))
}
pub type LineNote { LineNote(id: Int, pseudo: String, hint: String, why: String) }
```

`Problem` gets `patterns: List(Pattern)`, already resolved to the problem's language. The empty list means the problem has no Line Drill yet, and keeps today's rail.

## Implementation

1. **Pure domain: `src/gleamdrill/domain/line_drill.gleam`** (new). Pure and fully tested, in the same style as `domain/walk.gleam`.
   - `normalize(line) -> String`
   - `start(patterns) -> LineState`
   - `submit(state, text) -> #(LineState, Outcome)`, where `Outcome` is `Locked | Narrowed | Miss`
   - `reveal_line`, `choose_pattern`, `skeleton(state) -> List(Slot)`, `current_notes(state)`, `assembled(state) -> String`, `progress(state) -> #(Int, Int)`, `detect(patterns, editor_text) -> Option(String)` (used by the free-type rail)
   - `LineState` holds the alive candidates, the typed lines, the miss count for each line, the revealed lines, and the hint/why flags for each line.
2. **Sitting integration** (`src/gleamdrill/page/sitting/`).
   - `model.gleam`: add `line_drill: Option(LineState)` next to `blitz`. Extend `answer_revealed` (around lines 424–431) to count revealed lines. Add the line state to `UndoPoint`.
   - `msg.gleam`: add `LineSubmitted(String)`, `LineInputChanged(String)`, `LineHintShown`, `LineWhyShown`, `LineRevealed`, `LinePatternCycled`, `LineModeToggled`.
   - `update.gleam`:
     - Opening a problem picks the mode from the card's FSRS state, inside `initial_grading`/`problem_kind` (around lines 814–866).
     - Completion calls the existing `request_run` with `TestRun` on `assembled(state)`.
     - `answer_given_away` (around lines 721–729) counts a hint/why opened for the active blank before it locks. The explanation shown after a line locks never counts.
     - `graded` passes the mode into `wire.Review`.
   - `keys.gleam`: add the `LINE` label and the `l h y c p` bindings to the single binding table, so they show up in the status bar and help. While the line input is focused, only `Enter`, `Esc` and `Ctrl+Enter` are intercepted, as with the editor.
   - `panes.gleam`: Line Drill uses the Code panel region.
3. **Views.**
   - New `page/sitting/view/line_drill.gleam`, rendered with Lustre: given and locked lines as `div`s, one `<input>` for the active blank, and the right-hand line card.
   - It replaces `editor.view` inside the keyed `editor-frame` in `drill.gleam` `code_main` (around lines 244–323). Keep the frame's key so switching to free-type mounts CodeMirror cleanly.
   - Highlighting: add a small FFI `highlight(language, text) -> String` (HTML spans) in `platform/editor_ffi.mjs`. It reuses the StreamLanguage modes the editor already loads. Recommended over adding widget/atomic-range work to CodeMirror, which has none of that today.
   - Rewrite `view/rail.gleam` around patterns and lines. Keep the old ladder path for problems with `patterns == []`.
4. **Wire, server and insights.**
   - `wire.Review` gains `mode: ReviewMode` (`Free | Line`). Recall stays its own flag.
   - Add a migration in `server/src/server/migrations.gleam` (following migration 4's `recall`): `mode text not null default 'free'`.
   - Update `insert_review.sql`, then run `make sql`.
   - `clean_solves.sql` and the client `domain/insights`/`domain/guest` exclude `mode = 'line'` from clean solves, and stats split reviews by mode.
   - TUI: set `mode: Free` where it builds `wire.Review` (`tui/src/gleamdrill_tui/app.gleam`, around lines 1791–1798). No Line Drill in the TUI for now.
5. **Content, Python first.**
   - Pilot 10 problems covering the main patterns, starting with Reverse Linked List, Two Sum, Trapping Rain Water, Binary Search, Number of Islands, Coin Change, Merge Intervals and Top K Frequent.
   - Then the remaining 140, in batches of about 15 per PR.
   - Seed the prose from the existing `approaches/*.txt` walk steps and the solutions from the existing `python/solutions/*__variant.py` files.
   - Draft with an LLM, then pass `make verify` plus the generator checks, then human review.
   - Remove a problem's `approaches/<slug>.txt` once every language in its tracks has been ported. Until then, the generator keeps both.
6. **Docs.** Add a "Line Drill" section to `docs/design.md` covering the rung, the rules for what counts as a reveal and a clean solve, and the content format. Update the README's Contributing section.

## Acceptance criteria

- A new Python card opens in Line Drill.
  - Typing Reverse Linked List's lines by keyboard alone locks each one and updates "N of M".
  - Completion auto-runs the harness and shows the grade buttons.
  - The review is stored with `mode = 'line'`.
- Trapping Rain Water: a first line from the prefix-max pattern switches the skeleton and hints to that pattern. An ambiguous first line shows "2 ways from here".
- Revealing a line sets `revealed`. Opening a hint or why before typing a line counts as help, but not as a reveal. The explanation shown after a line locks counts as neither.
- A Review-state card opens free-typed. `l` toggles in both directions. Problems with no pattern content behave exactly as they do today.
- Generator errors fail `make content`. CI's generated-diff check still passes.

## Verification

- `make app-test`:
  - Unit tests for `domain/line_drill`.
  - qcheck properties: `assembled` of the full expected lines equals the pattern's code after normalization; `submit` never locks a line that is in no alive candidate; candidates only shrink unless `choose_pattern` is called; undo is exact with line state included.
  - birdie snapshots of the line view: start, ambiguous, locked, a miss after 3 tries, a revealed line, complete. Accept them with `gleam run -m birdie`.
- `make server-test`: the migration and `insert_review` round-trip with `mode`.
- `make verify`: every pattern solution passes its harness.
- `make build && make e2e`: a new flow in `test/browser/flow.mjs` that does Line Drill end to end on Reverse Linked List and asserts the review payload.
- `make tour`: add `exercises(...)` for every new `sitting.Line*` message, otherwise the tour fails by design.
- Manual: `make dev`, open `:1234`. Do Trapping Rain Water three ways, at phone width in devtools, and with the vim keymap set (Line Drill ignores it).

## Resolved questions

- Blank widths: each box is the expected line's length rounded up to a 4-character bucket. That keeps the code's shape without saying `curr = nxt` from `prev = curr`.
- Grade caps: none. The learner always picks the grade.
- Free-type rail detection: the pattern is guessed once, when the rail opens (or the problem does), from what is typed so far. It never switches under you while you type. The picker changes it by hand.
- Pattern key: `o`, not `p`. `p` already toggles the prompt in every drill.
- Vocabulary: `stack` was added beside `monotonic-stack`, for problems such as Valid Parentheses and Eval RPN that use a stack without keeping it monotonic.
- Focus: a drill opens with nothing focused, as the free editor does, so keys reach the table first; `i`, `e` or Enter put the cursor in the active blank.
- Trailing comments: a tagged line may not keep one (the learner would have to type it). The few that existed moved onto their own line above.
- Checking content without writing: `gleam run -m check_patterns [stem ...]` in `drills/` runs every generator check for the named problems only.
