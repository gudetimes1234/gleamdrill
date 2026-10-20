def maxProfit(prices):
    profit = 0
    buy = 0

    for sell in range(1, len(prices)):
        if prices[sell] < prices[buy]:
            buy = sell
        else:
            profit = max(profit, prices[sell] - prices[buy])

    return profit
