def rob(nums):
    # At each house the choice is take it and add what was safe two houses back,
    # or skip it and keep the best so far. Both answers are one number, so the
    # whole table collapses to a pair.
    best, previous = 0, 0
    for value in nums:
        best, previous = max(best, previous + value), best
    return best
