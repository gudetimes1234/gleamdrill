def search(nums, target):
    left, right = 0, len(nums) - 1  # @1

    while left <= right:  # @2
        mid = left + (right - left) // 2  # @3
        if nums[mid] == target:  # @4
            return mid  # @4

        # left half sorted
        if nums[left] <= nums[mid]:  # @5
            if nums[left] <= target < nums[mid]:  # @6
                right = mid - 1  # @6
            else:  # @7
                left = mid + 1  # @7
        # right half sorted
        else:  # @8
            if nums[mid] < target <= nums[right]:  # @9
                left = mid + 1  # @9
            else:  # @10
                right = mid - 1  # @10

    return -1  # @11
