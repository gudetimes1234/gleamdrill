def max_profit(prices)
  profit = 0
  (0...prices.length).each do |buy|
    (buy + 1...prices.length).each do |sell|
      profit = [profit, prices[sell] - prices[buy]].max
    end
  end
  profit
end
