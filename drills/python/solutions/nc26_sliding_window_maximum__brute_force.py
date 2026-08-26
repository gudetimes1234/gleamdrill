def maxSlidingWindow(nums, k):
    if k <= 0 or len(nums) < k:
        return []
    return [max(nums[i:i + k]) for i in range(len(nums) - k + 1)]
