export function maxProduct(nums: number[]): number {
  if (nums.length === 0) return 0;

  // A negative number turns the best running product into the worst and the
  // worst into the best, so both have to be carried. Zero resets them both,
  // which falls out of taking the element itself as an option.
  let high = nums[0];
  let low = nums[0];
  let best = nums[0];

  for (const n of nums.slice(1)) {
    const candidates = [n, high * n, low * n];
    high = Math.max(...candidates);
    low = Math.min(...candidates);
    best = Math.max(best, high);
  }

  return best;
}
