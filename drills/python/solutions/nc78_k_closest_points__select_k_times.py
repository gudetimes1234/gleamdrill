import heapq


def kClosest(points, k):
    # A heap of size k rather than a full sort: every point is pushed and the
    # farthest discarded, so the memory is O(k) and the time O(n log k). Worth
    # it exactly when k is small relative to n.
    heap = []  # @1
    for point in points:  # @2
        heapq.heappush(heap, (-(point[0] ** 2 + point[1] ** 2), point))  # @3
        if len(heap) > k:  # @4
            heapq.heappop(heap)  # @4
    return [point for _distance, point in heap]  # @5
