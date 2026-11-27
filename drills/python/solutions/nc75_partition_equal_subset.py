def canPartition(nums):
    total = sum(nums)  # @1
    if total % 2:  # @2
        return False  # @2

    # Subset sum in disguise: an equal split exists exactly when some subset
    # adds up to half the total. Carry the set of sums reachable so far and
    # widen it by each number -- no ordering, no table, and duplicates cost
    # nothing because a set collapses them.
    half = total // 2  # @3
    reachable = {0}  # @4
    for n in nums:  # @5
        reachable |= {reached + n for reached in reachable if reached + n <= half}  # @6

    return half in reachable  # @7
