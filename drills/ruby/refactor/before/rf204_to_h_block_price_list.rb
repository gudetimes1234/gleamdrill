def price_list(products)
  prices = {}
  products.each do |product|
    prices[product.name] = product.cents / 100.0
  end
  prices
end
