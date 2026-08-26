export function canJump(nums: number[]): boolean {
  // Only one number matters: the furthest index reachable so far. Walk forward
  // and extend it; the moment the walk gets past it, nothing further is
  // reachable.
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return reach >= nums.length - 1;
}
