export function insert(intervals: number[][], newInterval: number[]): number[][] {
  let [start, end] = newInterval;
  const out: number[][] = [];
  let i = 0;

  // The input is already sorted, so the list falls into three runs: everything
  // that finishes before the new one starts, everything that touches it, and
  // everything that starts after it ends.
  while (i < intervals.length && intervals[i][1] < start) out.push(intervals[i++]);

  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }

  out.push([start, end]);
  return out.concat(intervals.slice(i));
}
