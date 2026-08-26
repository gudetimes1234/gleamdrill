def maxCoins(nums):
    balloons = [1] + list(nums) + [1]
    n = len(balloons)
    table = [[0] * n for _ in range(n)]

    # The same "which balloon goes last" recurrence filled by hand, shortest
    # spans first -- because a span's answer needs both of the shorter spans
    # that a chosen last balloon splits it into. Writing the loop order out
    # makes that dependency visible where the recursion leaves it implicit.
    for width in range(2, n):
        for left in range(n - width):
            right = left + width
            table[left][right] = max(
                balloons[left] * balloons[last] * balloons[right]
                + table[left][last]
                + table[last][right]
                for last in range(left + 1, right)
            )

    return table[0][n - 1]
