from bisect import insort


class MedianFinder:
    def __init__(self):
        self.values = []

    # One sorted list, kept in order on insertion. Simpler to believe than two
    # halves, and the median is then just a lookup -- at the cost of an O(n)
    # insert where the two-heap version pays O(log n).
    def addNum(self, value):
        insort(self.values, value)

    def findMedian(self):
        n = len(self.values)
        if n == 0:
            return 0.0
        return (self.values[n // 2] + self.values[(n - 1) // 2]) / 2
