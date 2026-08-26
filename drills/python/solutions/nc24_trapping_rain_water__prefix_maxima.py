def trap(height):
    left = []
    best = 0
    for h in height:
        best = max(best, h)
        left.append(best)

    right = [0] * len(height)
    best = 0
    for i in range(len(height) - 1, -1, -1):
        best = max(best, height[i])
        right[i] = best

    return sum(min(left[i], right[i]) - height[i] for i in range(len(height)))
