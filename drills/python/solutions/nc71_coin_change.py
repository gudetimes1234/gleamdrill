def coinChange(coins, amount):
    # Build up from zero: the cheapest way to make a target is one coin more
    # than the cheapest way to make what is left after removing some coin. An
    # amount with no entry is simply unreachable, which saves inventing a
    # sentinel for infinity.
    table = {0: 0}

    for target in range(1, amount + 1):
        options = [table[target - coin] for coin in coins if coin <= target and target - coin in table]
        if options:
            table[target] = min(options) + 1

    return table.get(amount, -1)
