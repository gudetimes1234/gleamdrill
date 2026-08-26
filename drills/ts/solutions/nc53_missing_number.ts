export function missingNumber(nums: number[]): number {
  // XOR every value against every index it should have had. Each present number
  // meets its own index and cancels; the missing one has an index with no
  // partner, so that index is what survives.
  let result = nums.length;
  for (let i = 0; i < nums.length; i++) result ^= i ^ nums[i];
  return result;
}
