def uniquePaths(m, n):
    if m <= 0 or n <= 0:  # @1
        return 0  # @1

    # Every path is exactly m-1 downs and n-1 rights in some order, so the count
    # is the number of ways to choose which of the m+n-2 moves are downs -- a
    # binomial coefficient, and no grid at all. Multiplying and dividing in step
    # keeps every intermediate an exact integer.
    downs = m - 1  # @2
    total = m + n - 2  # @3
    result = 1  # @4
    for i in range(1, downs + 1):  # @5
        result = result * (total - downs + i) // i  # @6

    return result  # @7
