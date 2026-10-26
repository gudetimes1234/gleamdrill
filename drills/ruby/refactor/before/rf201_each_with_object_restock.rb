def restock_totals(orders)
  totals = {}
  orders.each do |order|
    if totals[order[:sku]]
      totals[order[:sku]] += order[:qty]
    else
      totals[order[:sku]] = order[:qty]
    end
  end
  totals
end
