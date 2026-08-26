export function kClosest(points: number[][], k: number): number[][] {
  // Pull the nearest point out k times rather than ordering everything. O(n·k)
  // against a full sort's O(n log n), so it wins exactly when k is small --
  // which is the same reason a bounded heap beats a sort on this problem.
  const remaining = [...points];
  const taken: number[][] = [];

  while (taken.length < k && remaining.length) {
    let best = 0;
    for (let i = 1; i < remaining.length; i++) {
      if (squared(remaining[i]) < squared(remaining[best])) best = i;
    }
    taken.push(remaining.splice(best, 1)[0]);
  }

  return taken;
}

function squared(point: number[]): number {
  return point[0] * point[0] + point[1] * point[1];
}
