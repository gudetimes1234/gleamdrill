def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False

    # Subset sum in disguise: an equal split exists exactly when some subset
    # adds up to half the total. Carry the set of sums reachable so far and
    # widen it by each number -- no ordering, no table, and duplicates cost
    # nothing because a set collapses them.
    half = total // 2
    reachable = {0}
    for n in nums:
        reachable |= {reached + n for reached in reachable if reached + n <= half}

    return half in reachable
