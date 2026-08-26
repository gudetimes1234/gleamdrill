export function findKthLargest(nums: number[], k: number): number | null {
  // Sorting answers every k at once, which is more than asked for but is the
  // version nobody gets wrong. O(n log n).
  if (k < 1 || k > nums.length) return null;
  return [...nums].sort((a, b) => b - a)[k - 1];
}
