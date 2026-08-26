def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False

    memo = {}

    # Take this number or leave it, keyed by how much is still owed and how much
    # of the list is left. Written as a recursion it is obviously a search over
    # subsets; the cache is what stops it enumerating all 2^n of them.
    def reachable(index, owed):
        if owed == 0:
            return True
        if index >= len(nums) or owed < 0:
            return False
        if (index, owed) not in memo:
            memo[(index, owed)] = reachable(index + 1, owed - nums[index]) or reachable(
                index + 1, owed
            )
        return memo[(index, owed)]

    return reachable(0, total // 2)
