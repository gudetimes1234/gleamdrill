def maxProfit(prices):
    # Three states rather than one number: holding a share, having just sold (so
    # today is the cooldown), and free to act. Each day's states depend only on
    # yesterday's, so the whole thing is three rolling values -- and the
    # cooldown is expressed simply by "free" never reading "sold" from the same
    # day.
    hold, sold, rest = float("-inf"), float("-inf"), 0

    for price in prices:
        hold, sold, rest = max(hold, rest - price), hold + price, max(rest, sold)

    return max(sold, rest, 0)
