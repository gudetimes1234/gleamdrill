def with_tax(prices)
  result = []
  prices.each do |price|
    result << (price * 1.2).round(2)
  end
  result
end
