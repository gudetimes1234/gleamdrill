def maxArea(height):
    # Every pair of lines, measured. O(n^2), but it makes what the two-pointer
    # sweep is maximising explicit: shorter line times distance.
    best = 0
    for left in range(len(height)):
        for right in range(left + 1, len(height)):
            best = max(best, (right - left) * min(height[left], height[right]))
    return best
