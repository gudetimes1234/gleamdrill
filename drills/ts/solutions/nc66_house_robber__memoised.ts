export function rob(nums: number[]): number {
  const memo = new Map<number, number>();

  // The same choice written as a recursion from the front: rob this house and
  // skip the next, or skip this one. Exponential without the cache and linear
  // with it -- which is the lesson, since the rolling pair hides that the
  // problem ever had a tree of choices at all.
  const best = (index: number): number => {
    if (index >= nums.length) return 0;
    if (!memo.has(index)) {
      memo.set(index, Math.max(nums[index] + best(index + 2), best(index + 1)));
    }
    return memo.get(index)!;
  };

  return best(0);
}
