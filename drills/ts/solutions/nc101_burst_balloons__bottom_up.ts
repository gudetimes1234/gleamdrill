export function maxCoins(nums: number[]): number {
  const balloons = [1, ...nums, 1];
  const n = balloons.length;
  const table = Array.from({ length: n }, () => new Array<number>(n).fill(0));

  // The same "which balloon goes last" recurrence filled by hand, shortest
  // spans first -- because a span's answer needs both of the shorter spans that
  // a chosen last balloon splits it into. Writing the loop order out makes that
  // dependency visible where the recursion leaves it implicit.
  for (let width = 2; width < n; width++) {
    for (let left = 0; left + width < n; left++) {
      const right = left + width;
      for (let last = left + 1; last < right; last++) {
        table[left][right] = Math.max(
          table[left][right],
          balloons[left] * balloons[last] * balloons[right] +
            table[left][last] +
            table[last][right],
        );
      }
    }
  }

  return table[0][n - 1];
}
