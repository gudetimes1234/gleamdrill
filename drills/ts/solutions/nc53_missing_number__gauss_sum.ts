export function missingNumber(nums: number[]): number {
  // The numbers 0..n sum to n(n+1)/2 whatever order they arrive in, so the gap
  // between that and the actual total is the missing value. One multiplication
  // instead of a pass of XORs -- but it overflows on inputs the XOR version
  // handles fine, which is the trade worth knowing.
  const n = nums.length;
  return (n * (n + 1)) / 2 - nums.reduce((a, b) => a + b, 0);
}
