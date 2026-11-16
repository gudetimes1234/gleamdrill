def maxProfit(prices):
    lowest = float('inf')  # @1
    profit = 0  # @2

    for price in prices:  # @3
        lowest = min(lowest, price)  # @4
        profit = max(profit, price - lowest)  # @5

    return profit  # @6
