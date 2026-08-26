def minCostClimbingStairs(cost):
    # The same recurrence read the other way: instead of "what did it cost to
    # get here", ask "what will it cost to finish from here". Walking backwards,
    # the answer at each step is its own price plus the cheaper of the two
    # ahead, and the start is the better of the first two.
    one_ahead, two_ahead = 0, 0
    for price in reversed(cost):
        one_ahead, two_ahead = price + min(one_ahead, two_ahead), one_ahead
    return min(one_ahead, two_ahead)
