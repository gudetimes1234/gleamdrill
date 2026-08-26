import heapq


class MedianFinder:
    def __init__(self):
        # `lower` is the smaller half as a max-heap (negated, since heapq is a
        # min-heap); `upper` is the larger half as a min-heap. The median is
        # always at one or both of those two roots.
        self.lower = []
        self.upper = []

    def addNum(self, value):
        heapq.heappush(self.lower, -value)
        # The smaller half must not hold anything bigger than the larger half's
        # smallest, and may hold at most one more element than it.
        heapq.heappush(self.upper, -heapq.heappop(self.lower))
        if len(self.upper) > len(self.lower):
            heapq.heappush(self.lower, -heapq.heappop(self.upper))

    def findMedian(self):
        if not self.lower:
            return 0.0
        if len(self.lower) > len(self.upper):
            return float(-self.lower[0])
        return (-self.lower[0] + self.upper[0]) / 2
