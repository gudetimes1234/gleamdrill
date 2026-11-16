def twoSum(nums, target):
    seen = {}  # @1
    for i, num in enumerate(nums):  # @2
        complement = target - num  # @3
        if complement in seen:  # @4
            return [seen[complement], i]  # @5
        seen[num] = i  # @6
    return []  # @7
