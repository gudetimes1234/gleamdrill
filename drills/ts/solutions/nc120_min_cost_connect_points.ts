export function minCostConnectPoints(points: number[][]): number {
  if (points.length === 0) return 0;

  // Prim's algorithm. Each outside point remembers only its distance to the
  // tree so far, so adding a point is one pass to find the nearest and one pass
  // to update -- O(n^2) total, which is what a complete graph costs anyway, and
  // it needs no heap. Cheapest-edge-first is safe because the cheapest edge
  // leaving any set of points is always in some minimum spanning tree.
  const outside = points.slice(1).map((point) => ({ point, cost: distance(points[0], point) }));
  let total = 0;

  while (outside.length) {
    let best = 0;
    for (let i = 1; i < outside.length; i++) if (outside[i].cost < outside[best].cost) best = i;
    const [nearest] = outside.splice(best, 1);
    total += nearest.cost;
    for (const entry of outside) {
      entry.cost = Math.min(entry.cost, distance(nearest.point, entry.point));
    }
  }

  return total;
}

function distance(a: number[], b: number[]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
