class MinStack:
    # Each entry carries the minimum of everything at or below it, so getMin is
    # a peek. One list instead of two, at the cost of storing a second int per
    # value.

    def __init__(self):
        self.entries = []

    def push(self, val):
        current_min = val if not self.entries else min(val, self.entries[-1][1])
        self.entries.append((val, current_min))

    def pop(self):
        self.entries.pop()

    def top(self):
        return self.entries[-1][0]

    def getMin(self):
        return self.entries[-1][1]
