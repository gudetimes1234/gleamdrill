def partition(s):
    return build(s)


# Every partition starts with some palindromic prefix, so the choice at each
# step is only how long that prefix is. Cutting there and recursing on the rest
# reaches each partition exactly once, in order, with nothing to dedupe.
def build(remaining):
    if not remaining:
        return [[]]
    return [
        [prefix] + rest
        for size in range(1, len(remaining) + 1)
        for prefix in [remaining[:size]]
        if prefix == prefix[::-1]
        for rest in build(remaining[size:])
    ]
