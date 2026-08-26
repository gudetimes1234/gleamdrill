def largestRectangleArea(heights):
    stack = []
    best = 0

    for i, h in enumerate(heights):
        start = i
        # Anything taller than the new bar can never extend past it, so its
        # rectangle is finished here. Whatever it reached back to becomes this
        # bar's own starting point.
        while stack and stack[-1][1] > h:
            from_index, tall = stack.pop()
            best = max(best, tall * (i - from_index))
            start = from_index
        stack.append((start, h))

    # Whatever survives was never cut off, so it runs to the far end.
    for from_index, tall in stack:
        best = max(best, tall * (len(heights) - from_index))

    return best
