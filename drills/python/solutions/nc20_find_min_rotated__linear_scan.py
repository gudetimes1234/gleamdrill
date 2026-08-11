def findMin(nums):
    # O(n) rather than O(log n), but it makes the shape of the problem obvious:
    # a rotated sorted array drops in value exactly once, and that drop is the
    # minimum. No drop means it was never rotated, so the head wins.
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return nums[i]
    return nums[0]
