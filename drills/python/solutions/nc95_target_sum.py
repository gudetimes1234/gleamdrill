def findTargetSumWays(nums, target):
    # The state that matters is only the running total, not which signs produced
    # it -- so carry a map from reachable total to how many ways reach it, and
    # widen it by each number twice, once added and once subtracted. Different
    # sign choices landing on the same total merge, which is what stops the
    # count being exponential in work.
    totals = {0: 1}  # @1

    for n in nums:  # @2
        following = {}  # @3
        for total, count in totals.items():  # @4
            following[total + n] = following.get(total + n, 0) + count  # @5
            following[total - n] = following.get(total - n, 0) + count  # @6
        totals = following  # @7

    return totals.get(target, 0)  # @8
