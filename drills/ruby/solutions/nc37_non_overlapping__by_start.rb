def erase_overlap_intervals(intervals)
  # Sorted by start instead: on an overlap you must drop one of the two, and
  # dropping whichever ends later is always at least as good. Same greedy
  # argument, made at the moment of the clash rather than in the sort order.
  removed = 0
  last_end = -Float::INFINITY

  intervals.sort.each do |start, finish|
    if start >= last_end
      last_end = finish
    else
      removed += 1
      last_end = [last_end, finish].min
    end
  end

  removed
end
