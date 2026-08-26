def maxArea(height):
    best = 0
    for left in range(len(height)):
        for right in range(left + 1, len(height)):
            best = max(best, (right - left) * min(height[left], height[right]))
    return best
