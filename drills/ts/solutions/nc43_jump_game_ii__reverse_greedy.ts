export function jump(nums: number[]): number {
  if (nums.length <= 1) return 0;

  // From the goal, step back to the *earliest* index that can reach it: taking
  // the earliest can never cost more jumps, and it is the only choice that is
  // obviously safe. O(n^2), and it makes the greedy argument visible.
  let goal = nums.length - 1;
  let jumps = 0;
  while (goal > 0) {
    const found = nums.findIndex((jumpLength, i) => i + jumpLength >= goal);
    if (found === -1) break;
    goal = found;
    jumps++;
  }
  return jumps;
}
