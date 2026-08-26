export function rob(nums: number[]): number {
  // At each house the choice is take it and add what was safe two houses back,
  // or skip it and keep the best so far. Both answers are one number, so the
  // whole table collapses to a pair.
  let best = 0;
  let previous = 0;
  for (const value of nums) [best, previous] = [Math.max(best, previous + value), best];
  return best;
}
