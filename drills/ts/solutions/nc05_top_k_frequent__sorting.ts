export function topKFrequent(nums: number[], k: number): number[] {
  // Straight sort by frequency: O(n log n) rather than the bucket version's
  // O(n), but it is the version you can write without thinking.
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}
