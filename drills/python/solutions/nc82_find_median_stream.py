import heapq


class MedianFinder:
    def __init__(self):
        # `lower` is the smaller half as a max-heap (negated, since heapq is a
        # min-heap); `upper` is the larger half as a min-heap. The median is
        # always at one or both of those two roots.
        self.lower = []  # @1
        self.upper = []  # @2

    def addNum(self, value):
        heapq.heappush(self.lower, -value)  # @3
        # The smaller half must not hold anything bigger than the larger half's
        # smallest, and may hold at most one more element than it.
        heapq.heappush(self.upper, -heapq.heappop(self.lower))  # @4
        if len(self.upper) > len(self.lower):  # @5
            heapq.heappush(self.lower, -heapq.heappop(self.upper))  # @6

    def findMedian(self):
        if not self.lower:  # @7
            return 0.0  # @7
        if len(self.lower) > len(self.upper):  # @8
            return float(-self.lower[0])  # @9
        return (-self.lower[0] + self.upper[0]) / 2  # @10
