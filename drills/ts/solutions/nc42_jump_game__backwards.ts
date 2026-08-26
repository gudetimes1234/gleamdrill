export function canJump(nums: number[]): boolean {
  if (nums.length === 0) return true;

  // Walk backwards carrying the leftmost index known to reach the end. Any
  // index that can reach *that* can reach the end, so it becomes the new goal.
  let goal = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (i + nums[i] >= goal) goal = i;
  }
  return goal === 0;
}
