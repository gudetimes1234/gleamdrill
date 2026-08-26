export function findTargetSumWays(nums: number[], target: number): number {
  // Rewrite the problem. If P is the set given a plus and N the set given a
  // minus, then P - N = target and P + N = total, so P = (total + target) / 2.
  // That turns a sign-assignment question into "how many subsets sum to a fixed
  // value" -- a knapsack, with no negative totals to track at all.
  const total = nums.reduce((a, b) => a + b, 0);
  const wanted = total + target;
  if (wanted < 0 || wanted % 2 !== 0 || total < Math.abs(target)) return 0;

  const goal = wanted / 2;
  let counts = new Map<number, number>([[0, 1]]);

  for (const n of nums) {
    const following = new Map(counts);
    for (const [reached, ways] of counts) {
      if (reached + n <= goal) {
        following.set(reached + n, (following.get(reached + n) ?? 0) + ways);
      }
    }
    counts = following;
  }

  return counts.get(goal) ?? 0;
}
