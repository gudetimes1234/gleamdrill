export function longestConsecutive(nums: number[]): number {
  // No set: sort, then walk once counting runs. O(n log n) rather than O(n),
  // but it needs no extra structure and the run logic reads straight through.
  if (nums.length === 0) return 0;

  const ordered = [...nums].sort((a, b) => a - b);
  let longest = 1;
  let run = 1;

  for (let i = 1; i < ordered.length; i++) {
    const step = ordered[i] - ordered[i - 1];
    if (step === 0) continue; // duplicates neither extend nor break a run
    if (step === 1) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  return longest;
}
