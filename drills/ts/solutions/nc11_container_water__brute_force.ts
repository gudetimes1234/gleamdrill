export function maxArea(height: number[]): number {
  let best = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    }
  }
  return best;
}
