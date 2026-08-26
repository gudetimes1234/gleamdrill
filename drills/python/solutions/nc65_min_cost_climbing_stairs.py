def minCostClimbingStairs(cost):
    # Cost to stand on each step, carried forward: getting here means having
    # paid for one of the two steps below, whichever was cheaper. Two variables
    # again, because nothing older than two steps back can matter.
    one_back, two_back = 0, 0
    for price in cost:
        one_back, two_back = price + min(one_back, two_back), one_back
    return min(one_back, two_back)
