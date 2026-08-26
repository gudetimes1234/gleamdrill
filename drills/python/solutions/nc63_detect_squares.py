class DetectSquares:
    def __init__(self):
        self.counts = {}

    def add(self, point):
        key = (point[0], point[1])
        self.counts[key] = self.counts.get(key, 0) + 1

    def count(self, point):
        x, y = point
        total = 0

        # Pick the corner diagonally opposite: that one choice fixes the whole
        # square, because the other two corners must be at (x, py) and (px, y).
        # A valid diagonal partner shares neither coordinate and sits on a true
        # diagonal, and duplicates multiply rather than repeat.
        for (px, py), copies in self.counts.items():
            if px == x or py == y or abs(px - x) != abs(py - y):
                continue
            total += copies * self.counts.get((x, py), 0) * self.counts.get((px, y), 0)

        return total
