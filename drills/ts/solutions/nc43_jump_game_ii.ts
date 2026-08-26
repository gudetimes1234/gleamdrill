export function jump(nums: number[]): number {
  // Breadth-first search without a queue. Everything reachable in k jumps forms
  // a contiguous window; when the walk reaches that window's end, one more jump
  // is spent and the next window runs to the furthest index seen.
  let jumps = 0;
  let windowEnd = 0;
  let furthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    furthest = Math.max(furthest, i + nums[i]);
    if (i === windowEnd) {
      jumps++;
      windowEnd = furthest;
    }
  }

  return jumps;
}
