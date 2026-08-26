def partitionLabels(s):
    # Overwriting as we go leaves each character mapped to its last position.
    last = {c: i for i, c in enumerate(s)}

    # A piece can only end where every character it contains has run out.
    # Extend the end to the furthest last-position seen; when the walk catches
    # up with it, the piece is closed.
    out = []
    start = 0
    end = -1
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            out.append(end - start + 1)
            start = i + 1

    return out
