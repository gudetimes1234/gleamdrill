def trap(height):
    total = 0
    for i in range(len(height)):
        left_max = max(height[: i + 1])
        right_max = max(height[i:])
        total += min(left_max, right_max) - height[i]
    return total
