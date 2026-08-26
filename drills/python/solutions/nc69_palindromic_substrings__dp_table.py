def countSubstrings(s):
    # The table says whether s[i..j] is a palindrome. It is when its ends match
    # and whatever is between them already was -- so the spans have to be filled
    # shortest first, which is the whole reason for the outer loop over length.
    n = len(s)
    table = {}
    total = 0

    for length in range(n):
        for i in range(n - length):
            j = i + length
            inside = True if j - i < 2 else table[(i + 1, j - 1)]
            table[(i, j)] = s[i] == s[j] and inside
            if table[(i, j)]:
                total += 1

    return total
