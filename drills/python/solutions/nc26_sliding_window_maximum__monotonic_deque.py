from collections import deque


def maxSlidingWindow(nums, k):
    if k <= 0:  # @1
        return []  # @1

    window = deque()  # @2
    out = []  # @2

    for i, num in enumerate(nums):  # @3
        while window and nums[window[-1]] <= num:  # @4
            window.pop()  # @4
        window.append(i)  # @5
        if window[0] <= i - k:  # @6
            window.popleft()  # @6
        if i >= k - 1:  # @7
            out.append(nums[window[0]])  # @7

    return out  # @8
