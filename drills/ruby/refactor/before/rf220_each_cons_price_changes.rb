def daily_changes(prices)
  (1...prices.length).map do |i|
    prices[i] - prices[i - 1]
  end
end
