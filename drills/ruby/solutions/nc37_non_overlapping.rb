def erase_overlap_intervals(intervals)
  # Greedy on the end: among any set of intervals competing for the same
  # space, keeping the one that finishes earliest leaves the most room for
  # whatever comes next, and can never be worse.
  removed = 0
  last_end = -Float::INFINITY

  intervals.sort_by { |interval| interval[1] }.each do |start, finish|
    if start >= last_end
      last_end = finish
    else
      removed += 1
    end
  end

  removed
end
