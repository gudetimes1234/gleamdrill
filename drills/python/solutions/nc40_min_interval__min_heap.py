import heapq


def minInterval(intervals, queries):
    # The O((n + q) log n) answer. Walk the queries in time order, letting in
    # every interval that has started by now, and keep the live ones in a heap
    # by length. The shortest one on top is the answer once anything that has
    # already ended is discarded -- and an interval only ever ends once, so the
    # discarding is amortised free.
    ordered = sorted(intervals)  # @1
    answers = {}  # @2
    heap = []  # @2
    i = 0  # @2

    for query in sorted(queries):  # @3
        while i < len(ordered) and ordered[i][0] <= query:  # @4
            start, end = ordered[i]  # @5
            heapq.heappush(heap, (end - start + 1, end))  # @5
            i += 1  # @5
        while heap and heap[0][1] < query:  # @6
            heapq.heappop(heap)  # @6
        answers[query] = heap[0][0] if heap else -1  # @7

    return [answers[query] for query in queries]  # @8
