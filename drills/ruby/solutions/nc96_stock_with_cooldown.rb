def max_profit(prices)
  # Three states rather than one number: holding a share, having just sold (so
  # today is the cooldown), and free to act. Each day's states depend only on
  # yesterday's, so the whole thing is three rolling values, and the cooldown
  # is expressed simply by "free" never reading "sold" from the same day.
  hold = -Float::INFINITY
  sold = -Float::INFINITY
  rest = 0

  prices.each do |price|
    hold, sold, rest = [hold, rest - price].max, hold + price, [rest, sold].max
  end

  [sold, rest, 0].max
end
