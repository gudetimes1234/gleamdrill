export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k <= 0 || nums.length < k) return [];
  const out: number[] = [];
  for (let i = 0; i + k <= nums.length; i++) out.push(Math.max(...nums.slice(i, i + k)));
  return out;
}
