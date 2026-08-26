// problems.all() is deterministic — every category is built from compile-time
// constants — but it is called by find/problems_in/search, which means once per
// keystroke in the menu. Rebuilding is O(problems x languages) records, each
// looking its drill up through a generated string `case`, so the cost grows
// quadratically with the content set. Gleam has no lazy static, so the memo
// lives here.
let cache;

export function memo(build) {
  if (cache === undefined) cache = build();
  return cache;
}
