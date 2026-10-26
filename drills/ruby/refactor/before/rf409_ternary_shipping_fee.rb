def shipping_fee(order)
  if order[:express]
    return 15
  else
    return 5
  end
end
