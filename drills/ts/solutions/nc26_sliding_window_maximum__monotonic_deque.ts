export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0) return [];

  // Indices, their values decreasing. `head` rather than shift(), which would
  // make every expiry O(n) and quietly undo the point of the deque.
  const window: number[] = [];
  let head = 0;
  const out: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (window.length > head && nums[window[window.length - 1]] <= nums[i]) window.pop();
    window.push(i);
    if (window[head] <= i - k) head++;
    if (i >= k - 1) out.push(nums[window[head]]);
  }

  return out;
}
