from collections import deque


def maxSlidingWindow(nums, k):
    if k <= 0:
        return []

    window = deque()
    out = []

    for i, num in enumerate(nums):
        while window and nums[window[-1]] <= num:
            window.pop()
        window.append(i)
        if window[0] <= i - k:
            window.popleft()
        if i >= k - 1:
            out.append(nums[window[0]])

    return out
