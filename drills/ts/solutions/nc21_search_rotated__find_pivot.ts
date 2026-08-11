export function search(nums: number[], target: number): number {
  // Two plain steps instead of one clever one: find where the rotation wrapped,
  // which splits the input into two ordinary sorted arrays, then binary search
  // each. Nothing has to reason mid-search about which half is sorted.
  const pivot = rotationPoint(nums);
  const found = binarySearch(nums, target, 0, pivot - 1);
  if (found !== -1) return found;
  return binarySearch(nums, target, pivot, nums.length - 1);
}

function rotationPoint(nums: number[]): number {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return i;
  }
  return 0;
}

function binarySearch(nums: number[], target: number, lo: number, hi: number): number {
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
}
