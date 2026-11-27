import heapq


def lastStoneWeight(stones):
    # Always the two heaviest, so the collection has to give up its maximum over
    # and over -- which is exactly what a heap is for. heapq is a min-heap, so
    # the values go in negated and come back out the same way.
    heap = [-stone for stone in stones]  # @1
    heapq.heapify(heap)  # @2

    while len(heap) > 1:  # @3
        heaviest = -heapq.heappop(heap)  # @4
        following = -heapq.heappop(heap)  # @5
        if heaviest != following:  # @6
            heapq.heappush(heap, -(heaviest - following))  # @6

    return -heap[0] if heap else 0  # @7
