def rob(nums):
    # The circle only matters through one constraint: the first and last houses
    # are neighbours, so at most one of them is robbed. Ruling each out in turn
    # leaves two ordinary straight-line problems, and the answer is the better.
    if not nums:  # @1
        return 0  # @1
    if len(nums) == 1:  # @2
        return nums[0]  # @2
    return max(straight(nums[1:]), straight(nums[:-1]))  # @3


def straight(nums):
    best, previous = 0, 0  # @4
    for value in nums:  # @5
        best, previous = max(best, previous + value), best  # @6
    return best  # @7
