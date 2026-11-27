def minMeetingRooms(intervals):
    # Rooms needed is the most meetings ever running at once, so the meetings
    # themselves stop mattering -- only their edges do. Walk the edges in time
    # order and watch how high the count gets.
    edges = []  # @1
    for start, end in intervals:  # @2
        edges.append((start, 1))  # @3
        edges.append((end, -1))  # @3

    # A room freed at the same moment another meeting starts can be reused, so
    # closes come before opens here -- the opposite of merging intervals.
    edges.sort()  # @4

    depth = 0  # @5
    best = 0  # @5
    for _position, delta in edges:  # @6
        depth += delta  # @7
        best = max(best, depth)  # @8
    return best  # @9
