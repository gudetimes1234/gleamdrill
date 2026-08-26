def partitionLabels(s):
    # Grow the piece one character at a time until nothing inside it also
    # appears in what is left. No last-position map -- the tail is asked
    # directly -- which is far slower but is the condition stated outright.
    out = []
    rest = s
    while rest:
        size = 1
        while any(c in rest[size:] for c in rest[:size]):
            size += 1
        out.append(size)
        rest = rest[size:]
    return out
