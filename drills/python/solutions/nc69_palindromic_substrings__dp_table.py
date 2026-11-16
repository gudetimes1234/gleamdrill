def countSubstrings(s):
    # The table says whether s[i..j] is a palindrome. It is when its ends match
    # and whatever is between them already was -- so the spans have to be filled
    # shortest first, which is the whole reason for the outer loop over length.
    n = len(s)  # @1
    table = {}  # @2
    total = 0  # @3

    for length in range(n):  # @4
        for i in range(n - length):  # @5
            j = i + length  # @6
            inside = True if j - i < 2 else table[(i + 1, j - 1)]  # @7
            table[(i, j)] = s[i] == s[j] and inside  # @8
            if table[(i, j)]:  # @9
                total += 1  # @9

    return total  # @10
