import heapq


def kClosest(points, k):
    # A heap of size k rather than a full sort: every point is pushed and the
    # farthest discarded, so the memory is O(k) and the time O(n log k). Worth
    # it exactly when k is small relative to n.
    heap = []
    for point in points:
        heapq.heappush(heap, (-(point[0] ** 2 + point[1] ** 2), point))
        if len(heap) > k:
            heapq.heappop(heap)
    return [point for _distance, point in heap]
