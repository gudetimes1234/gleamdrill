export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const total = nums1.length + nums2.length;
  if (total === 0) return 0;

  // Merge, but stop at the middle and keep only the last two values seen: the
  // merged array is never built, so this is O(m + n) time and no extra space.
  let i = 0;
  let j = 0;
  let previous = 0;
  let current = 0;
  for (let step = 0; step <= Math.floor(total / 2); step++) {
    previous = current;
    if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
      current = nums1[i++];
    } else {
      current = nums2[j++];
    }
  }

  return total % 2 === 1 ? current : (previous + current) / 2;
}
