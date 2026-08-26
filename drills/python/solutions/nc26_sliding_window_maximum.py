def maxSlidingWindow(nums, k):
    if k <= 0 or len(nums) < k:
        return []

    n = len(nums)
    left = [0] * n
    right = [0] * n

    for i in range(n):
        left[i] = nums[i] if i % k == 0 else max(left[i - 1], nums[i])
    for i in range(n - 1, -1, -1):
        right[i] = nums[i] if i == n - 1 or (i + 1) % k == 0 else max(right[i + 1], nums[i])

    # Every window of width k straddles at most one block boundary, so it is
    # covered by a suffix of one block and a prefix of the next.
    return [max(right[i], left[i + k - 1]) for i in range(n - k + 1)]
