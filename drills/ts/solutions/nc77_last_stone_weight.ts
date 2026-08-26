export function lastStoneWeight(stones: number[]): number {
  // Always the two heaviest, so the collection has to give up its maximum over
  // and over -- which is what a heap is for. Kept sorted descending here, since
  // JavaScript has no heap in the standard library.
  const remaining = [...stones].sort((a, b) => b - a);

  while (remaining.length > 1) {
    const heaviest = remaining.shift()!;
    const following = remaining.shift()!;
    if (heaviest !== following) {
      const left = heaviest - following;
      let at = remaining.findIndex((stone) => stone < left);
      if (at === -1) at = remaining.length;
      remaining.splice(at, 0, left);
    }
  }

  return remaining.length ? remaining[0] : 0;
}
