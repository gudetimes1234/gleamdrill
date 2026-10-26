def insert(intervals, new_interval)
  start, finish = new_interval
  out = []
  i = 0

  # The input is already sorted, so the list falls into three runs: everything
  # that finishes before the new one starts, everything that touches it, and
  # everything that starts after it ends.
  while i < intervals.length && intervals[i][1] < start
    out << intervals[i]
    i += 1
  end

  while i < intervals.length && intervals[i][0] <= finish
    start = [start, intervals[i][0]].min
    finish = [finish, intervals[i][1]].max
    i += 1
  end

  out << [start, finish]
  out + intervals[i..]
end
