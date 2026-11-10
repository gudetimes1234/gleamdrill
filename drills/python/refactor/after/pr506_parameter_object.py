from dataclasses import dataclass


@dataclass(frozen=True)
class Range:
    low: int
    high: int

    def contains(self, value):
        return self.low <= value <= self.high

    def clamp(self, value):
        return min(max(value, self.low), self.high)


def outside(readings, bounds):
    return [r for r in readings if not bounds.contains(r)]


def clamped(readings, bounds):
    return [bounds.clamp(r) for r in readings]


def report(readings, low, high):
    bounds = Range(low, high)
    return outside(readings, bounds), clamped(readings, bounds)
