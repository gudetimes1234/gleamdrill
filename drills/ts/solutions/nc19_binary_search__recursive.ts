export function search(nums: number[], target: number): number {
  return halve(nums, target, 0, nums.length - 1);
}

function halve(nums: number[], target: number, lo: number, hi: number): number {
  if (lo > hi) return -1;
  const mid = (lo + hi) >> 1;
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) return halve(nums, target, mid + 1, hi);
  return halve(nums, target, lo, mid - 1);
}
