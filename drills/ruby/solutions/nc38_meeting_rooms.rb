def can_attend_meetings(intervals)
  # Sorted by start, the only meeting a given one can clash with is the one
  # immediately before it: anything earlier started earlier still and would
  # have clashed with that one first.
  intervals.sort.each_cons(2).all? { |before, after| before[1] <= after[0] }
end
