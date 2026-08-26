export function findTargetSumWays(nums: number[], target: number): number {
  // The state that matters is only the running total, not which signs produced
  // it -- so carry a map from reachable total to how many ways reach it, and
  // widen it by each number twice, once added and once subtracted. Different
  // sign choices landing on the same total merge, which is what stops the count
  // being exponential in work.
  let totals = new Map<number, number>([[0, 1]]);

  for (const n of nums) {
    const following = new Map<number, number>();
    for (const [total, count] of totals) {
      following.set(total + n, (following.get(total + n) ?? 0) + count);
      following.set(total - n, (following.get(total - n) ?? 0) + count);
    }
    totals = following;
  }

  return totals.get(target) ?? 0;
}
