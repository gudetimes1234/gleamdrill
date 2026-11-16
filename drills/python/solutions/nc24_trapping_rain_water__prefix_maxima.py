def trap(height):
    left = []  # @1
    best = 0  # @2
    for h in height:  # @3
        best = max(best, h)  # @4
        left.append(best)  # @4

    right = [0] * len(height)  # @5
    best = 0  # @6
    for i in range(len(height) - 1, -1, -1):  # @7
        best = max(best, height[i])  # @8
        right[i] = best  # @8

    return sum(min(left[i], right[i]) - height[i] for i in range(len(height)))  # @9
