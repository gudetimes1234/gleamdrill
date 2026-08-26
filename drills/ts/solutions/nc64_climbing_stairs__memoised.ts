export function climbStairs(n: number): number {
  const memo = new Map<number, number>();

  // The same recurrence from the top down, with a cache. Slower and heavier
  // than the rolling pair, but it is the shape you reach for first when the
  // recurrence is not obviously a straight line -- and the memo is the whole
  // difference between O(n) and O(2^n).
  const ways = (k: number): number => {
    if (k <= 1) return 1;
    if (!memo.has(k)) memo.set(k, ways(k - 1) + ways(k - 2));
    return memo.get(k)!;
  };

  return ways(n);
}
