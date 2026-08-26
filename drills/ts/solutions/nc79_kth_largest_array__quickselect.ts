export function findKthLargest(nums: number[], k: number): number | null {
  if (k < 1 || k > nums.length) return null;
  return select(nums, k);
}

// Quickselect: partition around a pivot, then recurse into the side that must
// contain the answer rather than sorting both. Expected O(n), because the work
// halves each time instead of being repeated -- the same saving binary search
// makes over a scan.
function select(nums: number[], k: number): number {
  const pivot = nums[0];
  const rest = nums.slice(1);
  const bigger = rest.filter((n) => n > pivot);
  const equal = rest.filter((n) => n === pivot);
  const smaller = rest.filter((n) => n < pivot);

  if (k <= bigger.length) return select(bigger, k);
  if (k <= bigger.length + 1 + equal.length) return pivot;
  return select(smaller, k - bigger.length - 1 - equal.length);
}
