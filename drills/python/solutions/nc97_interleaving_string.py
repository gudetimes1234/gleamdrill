def isInterleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3):  # @1
        return False  # @1

    memo = {}  # @2

    # How much of each source has been used is the entire state -- the position
    # in the target is their sum, so it never has to be tracked. That collapse
    # from three indices to two is what makes the table two-dimensional.
    def works(i, j):
        if i == len(s1) and j == len(s2):  # @3
            return True  # @3
        if (i, j) not in memo:  # @4
            target = s3[i + j]  # @5
            memo[(i, j)] = (i < len(s1) and s1[i] == target and works(i + 1, j)) or (  # @6
                j < len(s2) and s2[j] == target and works(i, j + 1)  # @7
            )
        return memo[(i, j)]  # @8

    return works(0, 0)  # @9
