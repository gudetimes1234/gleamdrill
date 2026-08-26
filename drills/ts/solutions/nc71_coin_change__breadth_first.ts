export function coinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;

  // The amounts reachable with k coins form one level of a breadth-first search
  // from zero, so the first level containing the target is the answer. Same
  // bound as the table, but it stops the moment it arrives rather than filling
  // in every amount below the target.
  let frontier = [0];
  const seen = new Set([0]);
  let used = 0;

  while (frontier.length) {
    used++;
    const following: number[] = [];
    for (const total of frontier) {
      for (const coin of coins) {
        const next = total + coin;
        if (next === amount) return used;
        if (next < amount && !seen.has(next)) {
          seen.add(next);
          following.push(next);
        }
      }
    }
    frontier = following;
  }

  return -1;
}
