def minMeetingRooms(intervals):
    # Rooms needed is the most meetings ever running at once, so the meetings
    # themselves stop mattering -- only their edges do. Walk the edges in time
    # order and watch how high the count gets.
    edges = []
    for start, end in intervals:
        edges.append((start, 1))
        edges.append((end, -1))

    # A room freed at the same moment another meeting starts can be reused, so
    # closes come before opens here -- the opposite of merging intervals.
    edges.sort()

    depth = 0
    best = 0
    for _position, delta in edges:
        depth += delta
        best = max(best, depth)
    return best
