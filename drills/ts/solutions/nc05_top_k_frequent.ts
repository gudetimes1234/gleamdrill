export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  // A count can never exceed the input length, so one bucket per frequency
  // covers everything and the answer falls out of a single downward walk.
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, frequency] of counts) buckets[frequency].push(num);

  const result: number[] = [];
  for (let frequency = buckets.length - 1; frequency > 0; frequency--) {
    for (const num of buckets[frequency]) {
      result.push(num);
      if (result.length === k) return result;
    }
  }
  return result;
}
