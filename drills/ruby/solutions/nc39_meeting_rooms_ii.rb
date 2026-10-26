def min_meeting_rooms(intervals)
  # Rooms needed is the most meetings ever running at once, so the meetings
  # themselves stop mattering, only their edges do. Walk the edges in time
  # order and watch how high the count gets.
  edges = []
  intervals.each do |start, finish|
    edges << [start, 1]
    edges << [finish, -1]
  end

  # A room freed at the same moment another meeting starts can be reused, so
  # closes come before opens here: the opposite of merging intervals.
  edges.sort!

  depth = 0
  best = 0
  edges.each do |_position, delta|
    depth += delta
    best = [best, depth].max
  end
  best
end
