export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0 || nums.length < k) return [];

  const n = nums.length;
  const left = new Array<number>(n);
  const right = new Array<number>(n);

  for (let i = 0; i < n; i++) {
    left[i] = i % k === 0 ? nums[i] : Math.max(left[i - 1], nums[i]);
  }
  for (let i = n - 1; i >= 0; i--) {
    right[i] = i === n - 1 || (i + 1) % k === 0 ? nums[i] : Math.max(right[i + 1], nums[i]);
  }

  // Every window of width k straddles at most one block boundary, so it is
  // covered by a suffix of one block and a prefix of the next.
  const out: number[] = [];
  for (let i = 0; i + k <= n; i++) out.push(Math.max(right[i], left[i + k - 1]));
  return out;
}
