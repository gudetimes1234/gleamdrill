def cart_total(items)
  items.sum { |item| item[:price] * item[:qty] }
end
