def max_profit(prices)
  lowest = Float::INFINITY
  profit = 0

  prices.each do |price|
    lowest = [lowest, price].min
    profit = [profit, price - lowest].max
  end
  profit
end
