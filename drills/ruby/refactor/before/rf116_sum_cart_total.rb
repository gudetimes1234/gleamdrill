def cart_total(items)
  total = 0
  items.each do |item|
    total += item[:price] * item[:qty]
  end
  total
end
