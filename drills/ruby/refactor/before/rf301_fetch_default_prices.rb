def unit_price(prices, sku)
  if prices.key?(sku)
    prices[sku]
  else
    0
  end
end
