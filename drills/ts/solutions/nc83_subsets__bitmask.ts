export function subsets(nums: number[]): number[][] {
  // The in-or-out choices *are* the bits of a number, so counting from 0 to
  // 2^n - 1 enumerates every subset exactly once with no recursion at all.
  // Worth knowing: it also gives every subset a stable index, which matters
  // when subsets have to be compared or cached.
  return Array.from({ length: 1 << nums.length }, (_, mask) =>
    nums.filter((_value, i) => (mask >> i) & 1),
  );
}
