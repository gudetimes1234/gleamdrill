import heapq


class KthLargest:
    def __init__(self, k, nums):
        self.k = k  # @1
        # Only the k largest values can ever be the answer, so a min-heap of
        # size k is enough: the smallest thing in it is the answer, and anything
        # smaller than that is discarded on arrival in O(log k).
        self.heap = list(nums)  # @2
        heapq.heapify(self.heap)  # @2
        while len(self.heap) > k:  # @3
            heapq.heappop(self.heap)  # @3

    def add(self, value):
        heapq.heappush(self.heap, value)  # @4
        if len(self.heap) > self.k:  # @5
            heapq.heappop(self.heap)  # @5
        return self.heap[0] if len(self.heap) == self.k else None  # @6
