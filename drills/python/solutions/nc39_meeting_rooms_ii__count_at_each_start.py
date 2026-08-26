def minMeetingRooms(intervals):
    # The busiest moment is always the start of some meeting, so there are only
    # n moments worth testing. Count how many meetings cover each one and take
    # the largest -- O(n^2), and it needs no sort and no edge bookkeeping.
    best = 0
    for start, _end in intervals:
        running = sum(1 for s, e in intervals if s <= start < e)
        best = max(best, running)
    return best
