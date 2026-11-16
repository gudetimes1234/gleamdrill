def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)  # @1
    # (index, temp) — monotonically decreasing
    stack = []  # @2

    for i, temp in enumerate(temperatures):  # @3
        while stack and temp > stack[-1][1]:  # @4
            prev_index, _ = stack.pop()  # @5
            result[prev_index] = i - prev_index  # @6
        stack.append((i, temp))  # @7

    return result  # @8
