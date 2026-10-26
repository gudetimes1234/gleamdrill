def min_meeting_rooms(intervals)
  # The busiest moment is always the start of some meeting, so there are only
  # n moments worth testing. Count how many meetings cover each one and take
  # the largest: O(n^2), and it needs no sort and no edge bookkeeping.
  best = 0
  intervals.each do |start, _finish|
    running = intervals.count { |s, e| s <= start && start < e }
    best = [best, running].max
  end
  best
end
