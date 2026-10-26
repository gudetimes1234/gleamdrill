def shipping_city(order)
  begin
    order[:customer][:shipping][:city]
  rescue NoMethodError
    nil
  end
end
