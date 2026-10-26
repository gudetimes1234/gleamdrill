def prices_for(skus, catalog)
  prices = []
  (0...skus.length).each do |i|
    price = catalog[skus[i]]
    prices << price if price != nil
  end
  prices
end
