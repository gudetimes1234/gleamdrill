def partition(s):
    return build(s)  # @1


# Every partition starts with some palindromic prefix, so the choice at each
# step is only how long that prefix is. Cutting there and recursing on the rest
# reaches each partition exactly once, in order, with nothing to dedupe.
def build(remaining):
    if not remaining:  # @2
        return [[]]  # @2
    return [  # @3
        [prefix] + rest  # @3
        for size in range(1, len(remaining) + 1)  # @4
        for prefix in [remaining[:size]]  # @5
        if prefix == prefix[::-1]  # @6
        for rest in build(remaining[size:])  # @7
    ]
