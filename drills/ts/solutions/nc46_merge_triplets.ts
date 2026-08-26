export function mergeTriplets(triplets: number[][], target: number[]): boolean {
  // A triplet with any component above the target can never be used: merging
  // takes maxima, so that component would be stuck too high forever. Throw
  // those away and the rest can all be merged, because a max only ever helps.
  const best = [0, 0, 0];
  for (const triplet of triplets) {
    if (triplet.every((value, i) => value <= target[i])) {
      for (let i = 0; i < 3; i++) best[i] = Math.max(best[i], triplet[i]);
    }
  }
  return best.every((value, i) => value === target[i]);
}
