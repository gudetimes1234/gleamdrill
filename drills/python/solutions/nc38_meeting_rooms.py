def canAttendMeetings(intervals):
    # Sorted by start, the only meeting a given one can clash with is the one
    # immediately before it -- anything earlier started earlier still and would
    # have clashed with that one first.
    ordered = sorted(intervals)
    return all(ordered[i - 1][1] <= ordered[i][0] for i in range(1, len(ordered)))
