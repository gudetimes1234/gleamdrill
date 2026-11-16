def maxProfit(prices):
    profit = 0  # @1
    buy = 0  # @2

    for sell in range(1, len(prices)):  # @3
        if prices[sell] < prices[buy]:  # @4
            buy = sell  # @4
        else:  # @5
            profit = max(profit, prices[sell] - prices[buy])  # @5

    return profit  # @6
