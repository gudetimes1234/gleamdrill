export function lengthOfLIS(nums: number[]): number {
  // The longest subsequence ending at each position: one plus the best of every
  // earlier position holding a smaller value. Building the answers in order
  // means every "earlier position" is already known.
  const endings: [number, number][] = [];
  let best = 0;

  for (const n of nums) {
    const reachable = endings.filter(([value]) => value < n).map(([, length]) => length);
    const here = 1 + (reachable.length ? Math.max(...reachable) : 0);
    endings.push([n, here]);
    best = Math.max(best, here);
  }

  return best;
}
