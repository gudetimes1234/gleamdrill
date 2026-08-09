def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result
