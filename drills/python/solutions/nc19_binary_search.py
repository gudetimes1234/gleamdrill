def search(nums, target):
    left, right = 0, len(nums) - 1  # @1

    while left <= right:  # @2
        mid = left + (right - left) // 2  # @3
        if nums[mid] == target:  # @4
            return mid  # @4
        elif nums[mid] < target:  # @5
            left = mid + 1  # @5
        else:  # @6
            right = mid - 1  # @6

    return -1  # @7
