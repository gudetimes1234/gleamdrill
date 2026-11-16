class DetectSquares:
    def __init__(self):
        self.counts = {}  # @1

    def add(self, point):
        key = (point[0], point[1])  # @2
        self.counts[key] = self.counts.get(key, 0) + 1  # @3

    def count(self, point):
        x, y = point  # @4
        total = 0  # @5

        # Pick the corner diagonally opposite: that one choice fixes the whole
        # square, because the other two corners must be at (x, py) and (px, y).
        # A valid diagonal partner shares neither coordinate and sits on a true
        # diagonal, and duplicates multiply rather than repeat.
        for (px, py), copies in self.counts.items():  # @6
            if px == x or py == y or abs(px - x) != abs(py - y):  # @7
                continue  # @7
            total += copies * self.counts.get((x, py), 0) * self.counts.get((px, y), 0)  # @8

        return total  # @9
