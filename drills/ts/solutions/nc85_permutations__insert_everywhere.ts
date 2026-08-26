export function permute(nums: number[]): number[][] {
  // Build up instead of choosing: every permutation of n elements is a
  // permutation of n-1 with the new element wedged into one of its n positions.
  // No recursion into a shrinking remainder, and it explains the factorial
  // directly -- one more choice of position at every step.
  let permutations: number[][] = [[]];
  for (const value of nums) {
    permutations = permutations.flatMap((permutation) =>
      Array.from({ length: permutation.length + 1 }, (_, at) => [
        ...permutation.slice(0, at),
        value,
        ...permutation.slice(at),
      ]),
    );
  }
  return permutations;
}
