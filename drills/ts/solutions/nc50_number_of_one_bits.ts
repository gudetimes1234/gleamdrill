export function hammingWeight(n: number): number {
  // n & (n - 1) clears the lowest set bit and nothing else, so the loop runs
  // once per one bit rather than once per bit position.
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
}
