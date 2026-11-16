def maxSlidingWindow(nums, k):
    if k <= 0 or len(nums) < k:  # @1
        return []  # @1

    n = len(nums)  # @2
    left = [0] * n  # @2
    right = [0] * n  # @2

    for i in range(n):  # @3
        left[i] = nums[i] if i % k == 0 else max(left[i - 1], nums[i])  # @4
    for i in range(n - 1, -1, -1):  # @5
        right[i] = nums[i] if i == n - 1 or (i + 1) % k == 0 else max(right[i + 1], nums[i])  # @6

    # Every window of width k straddles at most one block boundary, so it is
    # covered by a suffix of one block and a prefix of the next.
    return [max(right[i], left[i + k - 1]) for i in range(n - k + 1)]  # @7
