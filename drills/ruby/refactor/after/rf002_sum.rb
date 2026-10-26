def total_quantity(items)
  items.sum { |item| item[:qty] }
end
