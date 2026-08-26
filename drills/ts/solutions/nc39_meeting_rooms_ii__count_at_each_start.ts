export function minMeetingRooms(intervals: number[][]): number {
  // The busiest moment is always the start of some meeting, so there are only n
  // moments worth testing. Count how many meetings cover each one and take the
  // largest -- O(n^2), and it needs no sort and no edge bookkeeping.
  let best = 0;
  for (const [start] of intervals) {
    const running = intervals.filter(([s, e]) => s <= start && start < e).length;
    best = Math.max(best, running);
  }
  return best;
}
