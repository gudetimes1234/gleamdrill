export function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  const memo = new Map<string, boolean>();

  // Take this number or leave it, keyed by how much is still owed and how much
  // of the list is left. Written as a recursion it is obviously a search over
  // subsets; the cache is what stops it enumerating all 2^n of them.
  const reachable = (index: number, owed: number): boolean => {
    if (owed === 0) return true;
    if (index >= nums.length || owed < 0) return false;
    const key = `${index},${owed}`;
    if (!memo.has(key)) {
      memo.set(key, reachable(index + 1, owed - nums[index]) || reachable(index + 1, owed));
    }
    return memo.get(key)!;
  };

  return reachable(0, total / 2);
}
