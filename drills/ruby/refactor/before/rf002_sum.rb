def total_quantity(items)
  total = 0
  items.each do |item|
    total += item[:qty]
  end
  total
end
