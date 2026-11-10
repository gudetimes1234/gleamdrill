def outside(readings, low, high):
    return [r for r in readings if r < low or r > high]


def clamped(readings, low, high):
    return [min(max(r, low), high) for r in readings]


def report(readings, low, high):
    return outside(readings, low, high), clamped(readings, low, high)
