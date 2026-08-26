export function lengthOfLIS(nums: number[]): number {
  // Patience sorting. Keep the smallest value that any subsequence of each
  // length ends with; that list is always sorted, so each number either extends
  // it or replaces the first entry it is no bigger than -- found by halving.
  // The list is not the answer subsequence, only its length is meaningful.
  const tails: number[] = [];

  for (const n of nums) {
    let low = 0;
    let high = tails.length;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (tails[mid] < n) low = mid + 1;
      else high = mid;
    }
    if (low === tails.length) tails.push(n);
    else tails[low] = n;
  }

  return tails.length;
}
