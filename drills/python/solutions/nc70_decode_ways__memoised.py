def numDecodings(s):
    if not s:
        return 0

    memo = {}

    # The same two choices as a recursion from the front: take one character, or
    # take two if they read as 10 to 26. Reaching the end is one complete
    # decoding, which is why the base case returns 1 rather than 0.
    def ways(i):
        if i >= len(s):
            return 1
        if s[i] == "0":
            return 0
        if i not in memo:
            total = ways(i + 1)
            if i + 1 < len(s) and 10 <= int(s[i:i + 2]) <= 26:
                total += ways(i + 2)
            memo[i] = total
        return memo[i]

    return ways(0)
