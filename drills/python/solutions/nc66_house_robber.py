def rob(nums):
    # At each house the choice is take it and add what was safe two houses back,
    # or skip it and keep the best so far. Both answers are one number, so the
    # whole table collapses to a pair.
    best, previous = 0, 0  # @1
    for value in nums:  # @2
        best, previous = max(best, previous + value), best  # @3
    return best  # @4
