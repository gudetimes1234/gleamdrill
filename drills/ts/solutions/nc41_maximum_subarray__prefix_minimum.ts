export function maxSubArray(nums: number[]): number {
  if (nums.length === 0) return 0;

  // The sum from i to j is prefix[j] - prefix[i-1], so the best subarray ending
  // at j is prefix[j] minus the smallest prefix before it. One pass carrying
  // that minimum answers the whole thing.
  let running = 0;
  let smallest = 0;
  let best = -Infinity;
  for (const n of nums) {
    running += n;
    best = Math.max(best, running - smallest);
    smallest = Math.min(smallest, running);
  }
  return best;
}
