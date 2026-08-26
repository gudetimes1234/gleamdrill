import gleam/list

pub fn min_meeting_rooms(intervals: List(#(Int, Int))) -> Int {
  // The busiest moment is always the start of some meeting, so there are only
  // n moments worth testing. Count how many meetings cover each one and take
  // the largest \u{2014} O(n\u{b2}), and it needs no sort and no edge bookkeeping.
  list.fold(intervals, 0, fn(best, meeting) {
    let running =
      list.count(intervals, fn(other) {
        other.0 <= meeting.0 && meeting.0 < other.1
      })
    case running > best {
      True -> running
      False -> best
    }
  })
}
