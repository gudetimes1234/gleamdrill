export function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (groupSize <= 0 || hand.length % groupSize !== 0) return false;

  // No counts: sort, then peel one full run off the front at a time, removing
  // each card as it is used. Slower -- every removal is an array walk -- but the
  // only thing to believe is that a group must begin with the smallest card
  // left.
  const cards = [...hand].sort((a, b) => a - b);
  while (cards.length) {
    const smallest = cards[0];
    for (let card = smallest; card < smallest + groupSize; card++) {
      const at = cards.indexOf(card);
      if (at === -1) return false;
      cards.splice(at, 1);
    }
  }

  return true;
}
