export function rob(nums: number[]): number {
  // The circle only matters through one constraint: the first and last houses
  // are neighbours, so at most one of them is robbed. Ruling each out in turn
  // leaves two ordinary straight-line problems, and the answer is the better.
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  return Math.max(straight(nums.slice(1)), straight(nums.slice(0, -1)));
}

function straight(nums: number[]): number {
  let best = 0;
  let previous = 0;
  for (const value of nums) [best, previous] = [Math.max(best, previous + value), best];
  return best;
}
