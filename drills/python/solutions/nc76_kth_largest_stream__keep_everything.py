class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.seen = list(nums)

    # Keep the whole stream and sort on demand. Wrong for a real stream --
    # memory grows without bound and every query costs a sort -- but it is the
    # definition, and it is what the bounded heap has to be checked against.
    def add(self, value):
        self.seen.append(value)
        if len(self.seen) < self.k:
            return None
        return sorted(self.seen, reverse=True)[self.k - 1]
