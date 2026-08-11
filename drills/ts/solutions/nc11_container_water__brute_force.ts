export function maxArea(height: number[]): number {
  // Every pair of lines, measured. O(n^2), but it makes what the two-pointer
  // sweep is maximising explicit: shorter line times distance.
  let best = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    }
  }
  return best;
}
