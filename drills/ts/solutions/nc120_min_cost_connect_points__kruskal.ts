export function minCostConnectPoints(points: number[][]): number {
  // Kruskal's algorithm: every edge, cheapest first, kept only when it joins
  // two pieces that are not already connected. Union-find is what makes that
  // test cheap. The trade against Prim's is the sort -- O(n^2 log n) edges here
  // against Prim's O(n^2) -- but Kruskal never needs the points themselves,
  // only the edge list, so it is the one that generalises to a sparse graph.
  const edges: [number, number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      edges.push([distance(points[i], points[j]), i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);

  const parents = new Map<number, number>();
  const find = (node: number): number => {
    while ((parents.get(node) ?? node) !== node) node = parents.get(node)!;
    return node;
  };

  let total = 0;
  for (const [cost, i, j] of edges) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parents.set(rootI, rootJ);
      total += cost;
    }
  }

  return total;
}

function distance(a: number[], b: number[]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
