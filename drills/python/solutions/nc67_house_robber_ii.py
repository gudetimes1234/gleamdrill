def rob(nums):
    # The circle only matters through one constraint: the first and last houses
    # are neighbours, so at most one of them is robbed. Ruling each out in turn
    # leaves two ordinary straight-line problems, and the answer is the better.
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    return max(straight(nums[1:]), straight(nums[:-1]))


def straight(nums):
    best, previous = 0, 0
    for value in nums:
        best, previous = max(best, previous + value), best
    return best
