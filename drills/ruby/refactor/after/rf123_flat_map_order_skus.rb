def skus(orders)
  orders.flat_map { |order| order.lines }
end
