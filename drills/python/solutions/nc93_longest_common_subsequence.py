def longestCommonSubsequence(text1, text2):
    # Compare the last characters: equal means both are used and the answer is
    # one more than the rest, different means the best of dropping one or the
    # other. Filled row by row, only the previous row is ever needed.
    previous = [0] * (len(text2) + 1)  # @1

    for a in text1:  # @2
        row = [0] * (len(text2) + 1)  # @3
        for j, b in enumerate(text2, start=1):  # @4
            row[j] = previous[j - 1] + 1 if a == b else max(previous[j], row[j - 1])  # @5
        previous = row  # @6

    return previous[-1]  # @7
