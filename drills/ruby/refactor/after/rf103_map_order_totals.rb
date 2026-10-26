def order_totals(orders)
  orders.map { |order| order[:qty] * order[:price] }
end
