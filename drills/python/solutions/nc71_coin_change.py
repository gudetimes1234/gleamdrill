def coinChange(coins, amount):
    # Build up from zero: the cheapest way to make a target is one coin more
    # than the cheapest way to make what is left after removing some coin. An
    # amount with no entry is simply unreachable, which saves inventing a
    # sentinel for infinity.
    table = {0: 0}  # @1

    for target in range(1, amount + 1):  # @2
        options = [table[target - coin] for coin in coins if coin <= target and target - coin in table]  # @3
        if options:  # @4
            table[target] = min(options) + 1  # @4

    return table.get(amount, -1)  # @5
