export function combinationSum2(candidates: number[], target: number): number[][] {
  return build([...candidates].sort((a, b) => a - b), target);
}

// Each candidate is used at most once, so taking one moves past it. The
// duplicate rule is the same as in Subsets II: skipping a value means skipping
// every copy of it, otherwise the same combination is rebuilt from a different
// copy of the same number.
function build(sorted: number[], target: number): number[][] {
  if (target === 0) return [[]];
  if (sorted.length === 0) return [];

  const first = sorted[0];
  if (first > target) return [];

  const withFirst = build(sorted.slice(1), target - first).map((rest) => [first, ...rest]);

  let past = 1;
  while (past < sorted.length && sorted[past] === first) past++;

  return [...withFirst, ...build(sorted.slice(past), target)];
}
