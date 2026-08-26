export function minMeetingRooms(intervals: number[][]): number {
  // Rooms needed is the most meetings ever running at once, so the meetings
  // themselves stop mattering -- only their edges do. Walk the edges in time
  // order and watch how high the count gets.
  const edges: [number, number][] = [];
  for (const [start, end] of intervals) {
    edges.push([start, 1]);
    edges.push([end, -1]);
  }
  // A room freed at the same moment another meeting starts can be reused, so
  // closes come before opens here -- the opposite of merging intervals.
  edges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let depth = 0;
  let best = 0;
  for (const [, delta] of edges) {
    depth += delta;
    best = Math.max(best, depth);
  }
  return best;
}
