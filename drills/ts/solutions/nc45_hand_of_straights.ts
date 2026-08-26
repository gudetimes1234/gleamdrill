export function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (groupSize <= 0 || hand.length % groupSize !== 0) return false;

  const counts = new Map<number, number>();
  for (const card of hand) counts.set(card, (counts.get(card) ?? 0) + 1);

  // The smallest card left has no smaller neighbour to hide behind, so whatever
  // group it belongs to must start with it. That removes all choice, which is
  // what makes the greedy correct -- and every copy of it needs its own group,
  // so they are all taken at once.
  for (const smallest of [...counts.keys()].sort((a, b) => a - b)) {
    const copies = counts.get(smallest) ?? 0;
    if (copies === 0) continue;
    for (let card = smallest; card < smallest + groupSize; card++) {
      const available = counts.get(card) ?? 0;
      if (available < copies) return false;
      counts.set(card, available - copies);
    }
  }

  return true;
}
