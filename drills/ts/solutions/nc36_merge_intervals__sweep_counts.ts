export function merge(intervals: number[][]): number[][] {
  // Forget the intervals and keep only their edges: +1 where one opens, -1
  // where one closes. A merged interval runs from the edge that lifts the
  // running count off zero to the edge that drops it back.
  const edges: [number, number][] = [];
  for (const [start, end] of intervals) {
    edges.push([start, 1]);
    edges.push([end, -1]);
  }
  // Opens before closes at the same coordinate, so touching intervals join.
  edges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  const out: number[][] = [];
  let depth = 0;
  let start = 0;
  for (const [position, delta] of edges) {
    if (depth === 0) start = position;
    depth += delta;
    if (depth === 0) out.push([start, position]);
  }
  return out;
}
