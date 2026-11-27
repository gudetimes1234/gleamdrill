def partitionLabels(s):
    # Overwriting as we go leaves each character mapped to its last position.
    last = {c: i for i, c in enumerate(s)}  # @1

    # A piece can only end where every character it contains has run out.
    # Extend the end to the furthest last-position seen; when the walk catches
    # up with it, the piece is closed.
    out = []  # @2
    start = 0  # @3
    end = -1  # @4
    for i, c in enumerate(s):  # @5
        end = max(end, last[c])  # @6
        if i == end:  # @7
            out.append(end - start + 1)  # @8
            start = i + 1  # @9

    return out  # @10
