def daily_changes(prices)
  prices.each_cons(2).map { |yesterday, today| today - yesterday }
end
