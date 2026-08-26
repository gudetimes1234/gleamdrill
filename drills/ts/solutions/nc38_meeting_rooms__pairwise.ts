export function canAttendMeetings(intervals: number[][]): boolean {
  // Every pair, checked. Two intervals overlap when each starts before the
  // other ends -- the condition worth being able to write from memory, since it
  // is easier to get right than its negation.
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      const a = intervals[i];
      const b = intervals[j];
      if (a[0] < b[1] && b[0] < a[1]) return false;
    }
  }
  return true;
}
