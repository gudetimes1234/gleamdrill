export function combinationSum(candidates: number[], target: number): number[][] {
  return build(candidates, target);
}

// Each step either takes the current candidate again -- reuse is allowed -- or
// drops it for good. Never going back to a dropped candidate is what stops the
// same combination appearing in several orders, so no deduplication is needed.
function build(candidates: number[], target: number): number[][] {
  if (target === 0) return [[]];
  if (candidates.length === 0) return [];

  const first = candidates[0];
  if (first > target || first <= 0) return build(candidates.slice(1), target);

  return [
    ...build(candidates, target - first).map((rest) => [first, ...rest]),
    ...build(candidates.slice(1), target),
  ];
}
