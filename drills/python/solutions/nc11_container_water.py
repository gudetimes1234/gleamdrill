def maxArea(height):
    left, right = 0, len(height) - 1  # @1
    best = 0  # @2

    while left < right:  # @3
        area = (right - left) * min(height[left], height[right])  # @4
        best = max(best, area)  # @5

        if height[left] < height[right]:  # @6
            left += 1  # @6
        else:  # @7
            right -= 1  # @7

    return best  # @8
