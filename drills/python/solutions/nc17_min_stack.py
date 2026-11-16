class MinStack:
    def __init__(self):
        self.stack = []  # @1
        self.mins = []  # @2

    def push(self, val):
        self.stack.append(val)  # @3
        current_min = val if not self.mins else min(val, self.mins[-1])  # @4
        self.mins.append(current_min)  # @5

    def pop(self):
        self.stack.pop()  # @6
        self.mins.pop()  # @7

    def top(self):
        return self.stack[-1]  # @8

    def getMin(self):
        return self.mins[-1]  # @9
