def trip_lengths(trips):
    lengths = []
    for trip in trips:
        lengths.append(trip[1] - trip[0])
    return lengths
