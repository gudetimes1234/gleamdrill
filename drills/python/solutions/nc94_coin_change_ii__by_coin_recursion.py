def change(amount, coins):
    usable = [coin for coin in coins if coin > 0]  # @1
    memo = {}  # @2

    # The same "combinations not permutations" rule stated as a choice instead
    # of a loop order: either use this coin again, or set it aside for good.
    # Setting it aside permanently is what fixes one order per combination.
    def ways(index, remaining):
        if remaining == 0:  # @3
            return 1  # @3
        if index >= len(usable):  # @4
            return 0  # @4
        if (index, remaining) not in memo:  # @5
            using = ways(index, remaining - usable[index]) if usable[index] <= remaining else 0  # @6
            memo[(index, remaining)] = using + ways(index + 1, remaining)  # @7
        return memo[(index, remaining)]  # @8

    return ways(0, amount)  # @9
