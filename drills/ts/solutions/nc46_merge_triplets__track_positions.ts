export function mergeTriplets(triplets: number[][], target: number[]): boolean {
  // Ask a different question: is each of the three positions hit exactly by
  // some usable triplet? The answer is yes exactly when all three are covered
  // -- the same condition, arrived at without taking maxima.
  const usable = triplets.filter((t) => t.every((value, i) => value <= target[i]));
  return target.every((value, i) => usable.some((t) => t[i] === value));
}
