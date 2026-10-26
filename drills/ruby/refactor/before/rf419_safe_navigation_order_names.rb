def shout_name(order)
  return nil if order.nil?
  return nil if order.customer.nil?
  order.customer.name.upcase
end
