def isInterleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3):
        return False

    memo = {}

    # How much of each source has been used is the entire state -- the position
    # in the target is their sum, so it never has to be tracked. That collapse
    # from three indices to two is what makes the table two-dimensional.
    def works(i, j):
        if i == len(s1) and j == len(s2):
            return True
        if (i, j) not in memo:
            target = s3[i + j]
            memo[(i, j)] = (i < len(s1) and s1[i] == target and works(i + 1, j)) or (
                j < len(s2) and s2[j] == target and works(i, j + 1)
            )
        return memo[(i, j)]

    return works(0, 0)
