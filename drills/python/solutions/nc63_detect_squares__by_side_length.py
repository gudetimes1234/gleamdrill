class DetectSquares:
    def __init__(self):
        self.counts = {}

    def add(self, point):
        key = (point[0], point[1])
        self.counts[key] = self.counts.get(key, 0) + 1

    def count(self, point):
        x, y = point
        total = 0

        # Pick the corner directly above or below instead. That fixes the side
        # length, which leaves two squares to check rather than one -- the
        # remaining corners can be to the left or to the right.
        for (px, py), copies in self.counts.items():
            if px != x or py == y:
                continue
            side = abs(py - y)
            for column in (x + side, x - side):
                total += (
                    copies
                    * self.counts.get((column, y), 0)
                    * self.counts.get((column, py), 0)
                )

        return total
