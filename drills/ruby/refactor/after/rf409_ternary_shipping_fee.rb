def shipping_fee(order)
  order[:express] ? 15 : 5
end
