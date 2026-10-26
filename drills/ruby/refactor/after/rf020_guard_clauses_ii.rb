def shipping_cost(order)
  return 0 if order.nil? || order[:items].empty?
  return 0 if order[:total] >= 50

  5
end
