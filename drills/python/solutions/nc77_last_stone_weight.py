import heapq


def lastStoneWeight(stones):
    # Always the two heaviest, so the collection has to give up its maximum over
    # and over -- which is exactly what a heap is for. heapq is a min-heap, so
    # the values go in negated and come back out the same way.
    heap = [-stone for stone in stones]
    heapq.heapify(heap)

    while len(heap) > 1:
        heaviest = -heapq.heappop(heap)
        following = -heapq.heappop(heap)
        if heaviest != following:
            heapq.heappush(heap, -(heaviest - following))

    return -heap[0] if heap else 0
