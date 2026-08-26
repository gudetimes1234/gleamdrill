export function insert(intervals: number[][], newInterval: number[]): number[][] {
  // Drop the new interval on the end and run the general merge. Throws away the
  // fact that the input was sorted -- O(n log n) rather than O(n) -- but it
  // reuses a solution you already have rather than a three-way split.
  const sorted = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  const out: number[][] = [];
  for (const [start, end] of sorted) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
}
