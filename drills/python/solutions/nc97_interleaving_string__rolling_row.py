def isInterleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3):
        return False

    # Bottom-up over the same two-index state. Row i says which prefixes of s2
    # can pair with the first i characters of s1; each row depends only on the
    # one above and on itself to the left, so one row suffices.
    row = [True] + [False] * len(s2)
    for j in range(1, len(s2) + 1):
        row[j] = row[j - 1] and s2[j - 1] == s3[j - 1]

    for i in range(1, len(s1) + 1):
        row[0] = row[0] and s1[i - 1] == s3[i - 1]
        for j in range(1, len(s2) + 1):
            target = s3[i + j - 1]
            row[j] = (row[j] and s1[i - 1] == target) or (row[j - 1] and s2[j - 1] == target)

    return row[len(s2)]
