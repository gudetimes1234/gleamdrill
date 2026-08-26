export function lastStoneWeight(stones: number[]): number {
  // No ordering kept at all: scan for the heaviest, remove it, scan again. O(n)
  // per round against a heap's O(log n) -- worse, but it makes clear that the
  // only operation the problem needs is "give me the largest", which is exactly
  // the interface a heap provides.
  const remaining = [...stones];

  while (remaining.length > 1) {
    const heaviest = takeMax(remaining);
    const following = takeMax(remaining);
    if (heaviest !== following) remaining.push(heaviest - following);
  }

  return remaining.length ? remaining[0] : 0;
}

function takeMax(stones: number[]): number {
  const largest = Math.max(...stones);
  stones.splice(stones.indexOf(largest), 1);
  return largest;
}
