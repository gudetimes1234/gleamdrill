def largestRectangleArea(heights):
    stack = []  # @1
    best = 0  # @1

    for i, h in enumerate(heights):  # @2
        start = i  # @3
        # Anything taller than the new bar can never extend past it, so its
        # rectangle is finished here. Whatever it reached back to becomes this
        # bar's own starting point.
        while stack and stack[-1][1] > h:  # @4
            from_index, tall = stack.pop()  # @5
            best = max(best, tall * (i - from_index))  # @6
            start = from_index  # @7
        stack.append((start, h))  # @8

    # Whatever survives was never cut off, so it runs to the far end.
    for from_index, tall in stack:  # @9
        best = max(best, tall * (len(heights) - from_index))  # @10

    return best  # @11
