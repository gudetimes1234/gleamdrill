def maxProfit(prices):
    memo = {}

    # The same three states as an explicit choice at each day: buy, sell, or do
    # nothing. After selling the recursion skips a day, which is the cooldown
    # stated where it happens rather than encoded in which value is read.
    def best(day, holding):
        if day >= len(prices):
            return 0
        if (day, holding) not in memo:
            waiting = best(day + 1, holding)
            if holding:
                acting = prices[day] + best(day + 2, False)
            else:
                acting = best(day + 1, True) - prices[day]
            memo[(day, holding)] = max(waiting, acting)
        return memo[(day, holding)]

    return best(0, False)
