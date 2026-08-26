export function findDuplicate(nums: number[]): number {
  // Binary search over the *values*, not the positions. For a candidate v,
  // count how many numbers are at most v: with no duplicate that count is
  // exactly v, so a count that runs ahead says the repeat is at or below v.
  // O(n log n) against Floyd's O(n), but it needs no insight about cycles --
  // only that the pigeonhole is what makes the count informative.
  let low = 1;
  let high = nums.length - 1;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    const seen = nums.filter((value) => value <= middle).length;
    if (seen > middle) high = middle;
    else low = middle + 1;
  }
  return low;
}
