export function subsets(nums: number[]): number[][] {
  // Every element is either in or out, independently, so the subsets of a list
  // are the subsets of its tail twice over: once with the head added and once
  // without. That is the whole recursion, and it is why there are 2^n of them.
  if (nums.length === 0) return [[]];
  const without = subsets(nums.slice(1));
  return [...without.map((subset) => [nums[0], ...subset]), ...without];
}
