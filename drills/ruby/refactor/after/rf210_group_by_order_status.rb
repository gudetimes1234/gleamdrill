def orders_by_status(orders)
  orders.group_by(&:status)
end
