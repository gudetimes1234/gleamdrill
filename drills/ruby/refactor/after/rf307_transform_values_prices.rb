def discounted(prices, percent)
  prices.transform_values { |price| (price * (100 - percent) / 100.0).round(2) }
end
