def minDistance(word1, word2):
    memo = {}

    # The same three edits as an explicit choice from the front. Running out of
    # one word costs whatever is left of the other, since every remaining
    # character has to be inserted or deleted.
    def cost(i, j):
        if i >= len(word1):
            return len(word2) - j
        if j >= len(word2):
            return len(word1) - i
        if (i, j) not in memo:
            if word1[i] == word2[j]:
                memo[(i, j)] = cost(i + 1, j + 1)
            else:
                memo[(i, j)] = 1 + min(cost(i + 1, j + 1), cost(i + 1, j), cost(i, j + 1))
        return memo[(i, j)]

    return cost(0, 0)
