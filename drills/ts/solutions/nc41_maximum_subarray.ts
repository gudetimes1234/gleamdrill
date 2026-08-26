export function maxSubArray(nums: number[]): number {
  if (nums.length === 0) return 0;

  // Kadane: at each position the best subarray ending here either extends the
  // one ending just before it or starts fresh. A running total that has gone
  // negative can only hurt whatever follows, so it is dropped.
  let here = nums[0];
  let best = nums[0];
  for (const n of nums.slice(1)) {
    here = Math.max(n, here + n);
    best = Math.max(best, here);
  }
  return best;
}
