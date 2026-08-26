def climbStairs(n):
    # The last move was either one step or two, so the ways to reach step n are
    # the ways to reach n-1 plus the ways to reach n-2 -- Fibonacci with a
    # staircase painted on it. Only the last two values matter.
    previous, current = 0, 1
    for _ in range(n):
        previous, current = current, previous + current
    return current
