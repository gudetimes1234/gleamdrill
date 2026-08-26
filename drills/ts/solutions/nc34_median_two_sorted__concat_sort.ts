export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  if (merged.length === 0) return 0;
  // One expression for both parities: for an odd length the two indices are the
  // same element, so the average of it with itself is itself.
  return (merged[Math.floor(merged.length / 2)] + merged[Math.floor((merged.length - 1) / 2)]) / 2;
}
