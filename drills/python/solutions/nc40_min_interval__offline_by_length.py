def minInterval(intervals, queries):
    # Answer each query once, and never revisit it. Taking the intervals
    # shortest first means the first interval to cover a query is already its
    # answer, so every query leaves the pool the moment it is settled and the
    # pool only ever shrinks.
    answers = [-1] * len(queries)
    waiting = list(enumerate(queries))

    for start, end in sorted(intervals, key=lambda i: i[1] - i[0]):
        still_waiting = []
        for index, query in waiting:
            if start <= query <= end:
                answers[index] = end - start + 1
            else:
                still_waiting.append((index, query))
        waiting = still_waiting

    return answers
