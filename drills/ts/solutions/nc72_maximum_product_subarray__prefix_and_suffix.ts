export function maxProduct(nums: number[]): number {
  if (nums.length === 0) return 0;
  // A different argument entirely: the best subarray always runs to one end of
  // the block it sits in, so sweeping running products from both directions --
  // resetting at every zero -- is enough.
  return Math.max(sweep(nums), sweep([...nums].reverse()));
}

function sweep(nums: number[]): number {
  let running = 1;
  let best = -Infinity;
  for (const n of nums) {
    running = running === 0 ? n : running * n;
    best = Math.max(best, running);
  }
  return best;
}
