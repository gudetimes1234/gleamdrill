def largestRectangleArea(heights):
    best = 0

    for i, h in enumerate(heights):
        # How far this bar's own height can spread in each direction. O(n^2),
        # and the definition of the answer: every rectangle is some bar taken
        # as far as it will go.
        left = i
        while left > 0 and heights[left - 1] >= h:
            left -= 1
        right = i
        while right + 1 < len(heights) and heights[right + 1] >= h:
            right += 1
        best = max(best, h * (right - left + 1))

    return best
