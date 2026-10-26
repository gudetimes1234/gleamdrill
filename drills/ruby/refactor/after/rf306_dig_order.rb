def shipping_city(order)
  order.dig(:customer, :shipping, :city)
end
