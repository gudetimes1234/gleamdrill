export function eraseOverlapIntervals(intervals: number[][]): number {
  // Sorted by start instead: on an overlap you must drop one of the two, and
  // dropping whichever ends later is always at least as good. Same greedy
  // argument, made at the moment of the clash rather than in the sort order.
  let removed = 0;
  let lastEnd = Infinity;
  let first = true;

  for (const [start, end] of [...intervals].sort((a, b) => a[0] - b[0])) {
    if (first || start >= lastEnd) {
      lastEnd = end;
      first = false;
    } else {
      removed++;
      lastEnd = Math.min(lastEnd, end);
    }
  }

  return removed;
}
