def twoSum(nums, target):
    ordered = sorted((num, i) for i, num in enumerate(nums))  # @1
    left, right = 0, len(ordered) - 1  # @2

    while left < right:  # @3
        total = ordered[left][0] + ordered[right][0]  # @4
        if total == target:  # @5
            return sorted([ordered[left][1], ordered[right][1]])  # @5
        if total < target:  # @6
            left += 1  # @6
        else:  # @7
            right -= 1  # @7

    return []  # @8
