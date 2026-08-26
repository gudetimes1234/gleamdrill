def kClosest(points, k):
    # Sorting by *squared* distance rather than distance: the square root is
    # monotonic, so it cannot change the order, and skipping it keeps everything
    # in integers with no rounding to argue about.
    return sorted(points, key=lambda point: point[0] ** 2 + point[1] ** 2)[:k]
