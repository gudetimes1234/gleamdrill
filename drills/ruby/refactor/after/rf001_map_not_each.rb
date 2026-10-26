def with_tax(prices)
  prices.map { |price| (price * 1.2).round(2) }
end
