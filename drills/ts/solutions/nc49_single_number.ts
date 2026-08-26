export function singleNumber(nums: number[]): number {
  // XOR is its own inverse and does not care about order, so every value that
  // appears twice cancels itself out and only the lone one survives.
  return nums.reduce((result, n) => result ^ n, 0);
}
