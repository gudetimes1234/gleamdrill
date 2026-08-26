import heapq


def minInterval(intervals, queries):
    # The O((n + q) log n) answer. Walk the queries in time order, letting in
    # every interval that has started by now, and keep the live ones in a heap
    # by length. The shortest one on top is the answer once anything that has
    # already ended is discarded -- and an interval only ever ends once, so the
    # discarding is amortised free.
    ordered = sorted(intervals)
    answers = {}
    heap = []
    i = 0

    for query in sorted(queries):
        while i < len(ordered) and ordered[i][0] <= query:
            start, end = ordered[i]
            heapq.heappush(heap, (end - start + 1, end))
            i += 1
        while heap and heap[0][1] < query:
            heapq.heappop(heap)
        answers[query] = heap[0][0] if heap else -1

    return [answers[query] for query in queries]
