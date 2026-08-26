def canAttendMeetings(intervals):
    # Every pair, checked. Two intervals overlap when each starts before the
    # other ends -- the condition worth being able to write from memory, since
    # it is easier to get right than its negation.
    for i in range(len(intervals)):
        for j in range(i + 1, len(intervals)):
            a, b = intervals[i], intervals[j]
            if a[0] < b[1] and b[0] < a[1]:
                return False
    return True
