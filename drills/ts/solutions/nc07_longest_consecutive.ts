export function longestConsecutive(nums: number[]): number {
  const all = new Set(nums);
  let longest = 0;

  for (const num of all) {
    // Only count from the start of a run, so each run is walked once.
    if (all.has(num - 1)) continue;
    let length = 1;
    while (all.has(num + length)) length++;
    longest = Math.max(longest, length);
  }

  return longest;
}
