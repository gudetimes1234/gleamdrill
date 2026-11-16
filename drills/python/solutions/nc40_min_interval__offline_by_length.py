def minInterval(intervals, queries):
    # Answer each query once, and never revisit it. Taking the intervals
    # shortest first means the first interval to cover a query is already its
    # answer, so every query leaves the pool the moment it is settled and the
    # pool only ever shrinks.
    answers = [-1] * len(queries)  # @1
    waiting = list(enumerate(queries))  # @2

    for start, end in sorted(intervals, key=lambda i: i[1] - i[0]):  # @3
        still_waiting = []  # @4
        for index, query in waiting:  # @5
            if start <= query <= end:  # @6
                answers[index] = end - start + 1  # @6
            else:  # @7
                still_waiting.append((index, query))  # @7
        waiting = still_waiting  # @8

    return answers  # @9
