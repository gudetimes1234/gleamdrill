def findMin(nums):
    left, right = 0, len(nums) - 1  # @1

    while left < right:  # @2
        mid = left + (right - left) // 2  # @3
        if nums[mid] > nums[right]:  # @4
            left = mid + 1  # @4
        else:  # @5
            right = mid  # @5

    return nums[left]  # @6
