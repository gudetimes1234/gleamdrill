export function countBits(n: number): number[] {
  return Array.from({ length: n + 1 }, (_, i) => popcount(i));
}

// Each number counted from scratch with the clear-lowest-bit trick. O(n log n)
// against the dynamic version's O(n), and it remembers nothing between numbers
// -- which is exactly what the other one exploits.
function popcount(n: number): number {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
}
