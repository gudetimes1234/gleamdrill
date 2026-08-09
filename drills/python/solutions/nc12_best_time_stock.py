def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit
