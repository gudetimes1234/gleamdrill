def change(amount, coins):
    usable = [coin for coin in coins if coin > 0]
    memo = {}

    # The same "combinations not permutations" rule stated as a choice instead
    # of a loop order: either use this coin again, or set it aside for good.
    # Setting it aside permanently is what fixes one order per combination.
    def ways(index, remaining):
        if remaining == 0:
            return 1
        if index >= len(usable):
            return 0
        if (index, remaining) not in memo:
            using = ways(index, remaining - usable[index]) if usable[index] <= remaining else 0
            memo[(index, remaining)] = using + ways(index + 1, remaining)
        return memo[(index, remaining)]

    return ways(0, amount)
