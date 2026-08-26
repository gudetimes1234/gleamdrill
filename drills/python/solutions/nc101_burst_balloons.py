def maxCoins(nums):
    # Padding with a 1 at each end removes the edge cases: every balloon then
    # has a neighbour on both sides whatever happens.
    balloons = [1] + list(nums) + [1]
    memo = {}

    # The trick is to ask which balloon is burst *last* in a span rather than
    # first. The last one still has both span boundaries as neighbours -- they
    # are untouched by definition -- so its value is known, and the two sides
    # become independent subproblems. Asking "first" leaves neighbours that
    # depend on the other side, and the recursion does not close.
    def best(left, right):
        if right - left < 2:
            return 0
        if (left, right) not in memo:
            memo[(left, right)] = max(
                balloons[left] * balloons[last] * balloons[right]
                + best(left, last)
                + best(last, right)
                for last in range(left + 1, right)
            )
        return memo[(left, right)]

    return best(0, len(balloons) - 1)
