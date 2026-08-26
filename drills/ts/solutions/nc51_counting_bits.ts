export function countBits(n: number): number[] {
  // Every number is some smaller number with one extra bit on the end:
  // count(i) is count(i >> 1) plus whatever that last bit is. Each answer costs
  // one lookup, so the whole array is O(n).
  const counts = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= n; i++) counts[i] = counts[i >> 1] + (i & 1);
  return counts;
}
