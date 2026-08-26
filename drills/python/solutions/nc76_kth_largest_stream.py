import heapq


class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        # Only the k largest values can ever be the answer, so a min-heap of
        # size k is enough: the smallest thing in it is the answer, and anything
        # smaller than that is discarded on arrival in O(log k).
        self.heap = list(nums)
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, value):
        heapq.heappush(self.heap, value)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0] if len(self.heap) == self.k else None
