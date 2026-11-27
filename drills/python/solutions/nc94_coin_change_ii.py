def change(amount, coins):
    # Combinations, not permutations -- which is entirely decided by the loop
    # order. Coins on the outside means each coin is considered once and for all
    # before the next is looked at, so 1+2 and 2+1 can never both be counted.
    # Swapping the loops would count orderings instead.
    ways = [0] * (amount + 1)  # @1
    ways[0] = 1  # @2

    for coin in coins:  # @3
        if coin <= 0:  # @4
            continue  # @4
        for target in range(coin, amount + 1):  # @5
            ways[target] += ways[target - coin]  # @6

    return ways[amount]  # @7
