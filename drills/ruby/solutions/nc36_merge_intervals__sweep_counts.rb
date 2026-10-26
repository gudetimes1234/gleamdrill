def merge(intervals)
  # Forget the intervals and keep only their edges: +1 where one opens, -1
  # where one closes. A merged interval runs from the edge that lifts the
  # running count off zero to the edge that drops it back.
  #
  # Sorting by -delta ascending puts opens before closes at the same
  # coordinate, so touching intervals join.
  edges = []
  intervals.each do |start, finish|
    edges << [start, 1]
    edges << [finish, -1]
  end
  edges.sort_by! { |position, delta| [position, -delta] }

  out = []
  depth = 0
  start = 0
  edges.each do |position, delta|
    start = position if depth.zero?
    depth += delta
    out << [start, position] if depth.zero?
  end
  out
end
