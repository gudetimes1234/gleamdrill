def restock_totals(orders)
  orders.each_with_object(Hash.new(0)) { |order, totals| totals[order[:sku]] += order[:qty] }
end
