def can_attend_meetings(intervals)
  # Every pair, checked. Two intervals overlap when each starts before the
  # other ends: the condition worth being able to write from memory, since
  # it is easier to get right than its negation.
  (0...intervals.length).each do |i|
    (i + 1...intervals.length).each do |j|
      a = intervals[i]
      b = intervals[j]
      return false if a[0] < b[1] && b[0] < a[1]
    end
  end
  true
end
