def trap(height):
    left, right = 0, len(height) - 1  # @1
    left_max = right_max = total = 0  # @2

    while left < right:  # @3
        if height[left] < height[right]:  # @4
            left_max = max(left_max, height[left])  # @5
            total += left_max - height[left]  # @6
            left += 1  # @7
        else:  # @8
            right_max = max(right_max, height[right])  # @9
            total += right_max - height[right]  # @10
            right -= 1  # @11

    return total  # @12
