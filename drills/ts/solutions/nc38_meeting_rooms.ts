export function canAttendMeetings(intervals: number[][]): boolean {
  // Sorted by start, the only meeting a given one can clash with is the one
  // immediately before it -- anything earlier started earlier still and would
  // have clashed with that one first.
  const ordered = [...intervals].sort((a, b) => a[0] - b[0]);
  return ordered.every((meeting, i) => i === 0 || ordered[i - 1][1] <= meeting[0]);
}
