export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Always halve the shorter side, so the search is O(log min(m, n)).
  let a = nums1;
  let b = nums2;
  if (a.length > b.length) [a, b] = [b, a];

  const m = a.length;
  const n = b.length;
  const total = m + n;
  if (total === 0) return 0;
  const half = Math.floor((total + 1) / 2);

  let low = 0;
  let high = m;
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = half - cut1;

    const left1 = cut1 > 0 ? a[cut1 - 1] : -Infinity;
    const right1 = cut1 < m ? a[cut1] : Infinity;
    const left2 = cut2 > 0 ? b[cut2 - 1] : -Infinity;
    const right2 = cut2 < n ? b[cut2] : Infinity;

    // A correct cut is one where everything left of it is <= everything right
    // of it, across both arrays.
    if (left1 <= right2 && left2 <= right1) {
      if (total % 2 === 1) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }
    if (left1 > right2) high = cut1 - 1;
    else low = cut1 + 1;
  }

  return 0;
}
