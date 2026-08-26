export function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  // Subset sum in disguise: an equal split exists exactly when some subset adds
  // up to half the total. Carry the set of sums reachable so far and widen it by
  // each number -- no ordering, no table, and duplicates cost nothing because a
  // set collapses them.
  const half = total / 2;
  let reachable = new Set([0]);
  for (const n of nums) {
    const widened = new Set(reachable);
    for (const reached of reachable) {
      if (reached + n <= half) widened.add(reached + n);
    }
    reachable = widened;
  }

  return reachable.has(half);
}
