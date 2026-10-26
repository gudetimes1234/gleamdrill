def discounted(prices, percent)
  result = {}
  prices.each do |item, price|
    result[item] = (price * (100 - percent) / 100.0).round(2)
  end
  result
end
