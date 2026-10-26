def order_totals(orders)
  totals = Array.new(orders.length)
  orders.each_with_index do |order, i|
    totals[i] = order[:qty] * order[:price]
  end
  totals
end
