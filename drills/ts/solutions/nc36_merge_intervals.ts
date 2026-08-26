export function merge(intervals: number[][]): number[][] {
  // Sorted by start, an interval can only ever overlap the one being built, so
  // a single pass is enough: extend it, or begin a new one.
  const out: number[][] = [];
  for (const [start, end] of [...intervals].sort((a, b) => a[0] - b[0])) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
}
