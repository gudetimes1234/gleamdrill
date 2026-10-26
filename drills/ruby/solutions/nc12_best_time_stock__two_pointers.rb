def max_profit(prices)
  profit = 0
  buy = 0

  (1...prices.length).each do |sell|
    if prices[sell] < prices[buy]
      buy = sell
    else
      profit = [profit, prices[sell] - prices[buy]].max
    end
  end
  profit
end
