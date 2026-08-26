export function maxCoins(nums: number[]): number {
  // Padding with a 1 at each end removes the edge cases: every balloon then has
  // a neighbour on both sides whatever happens.
  const balloons = [1, ...nums, 1];
  const memo = new Map<string, number>();

  // The trick is to ask which balloon is burst *last* in a span rather than
  // first. The last one still has both span boundaries as neighbours -- they
  // are untouched by definition -- so its value is known, and the two sides
  // become independent subproblems. Asking "first" leaves neighbours that
  // depend on the other side, and the recursion does not close.
  const best = (left: number, right: number): number => {
    if (right - left < 2) return 0;
    const key = `${left},${right}`;
    if (!memo.has(key)) {
      let found = 0;
      for (let last = left + 1; last < right; last++) {
        found = Math.max(
          found,
          balloons[left] * balloons[last] * balloons[right] + best(left, last) + best(last, right),
        );
      }
      memo.set(key, found);
    }
    return memo.get(key)!;
  };

  return best(0, balloons.length - 1);
}
