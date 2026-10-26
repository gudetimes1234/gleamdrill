def delivery_date(order, rush)
  near = order[:state] == "MA" || order[:state] == "CT"
  if rush
    order[:placed] + (near ? 1 : 2)
  else
    order[:placed] + (near ? 2 : 3)
  end
end
