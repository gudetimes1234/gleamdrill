export function eraseOverlapIntervals(intervals: number[][]): number {
  // Greedy on the end: among any set of intervals competing for the same space,
  // keeping the one that finishes earliest leaves the most room for whatever
  // comes next, and can never be worse.
  let removed = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of [...intervals].sort((a, b) => a[1] - b[1])) {
    if (start >= lastEnd) lastEnd = end;
    else removed++;
  }

  return removed;
}
