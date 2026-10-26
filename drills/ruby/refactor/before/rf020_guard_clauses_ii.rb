def shipping_cost(order)
  if order
    if order[:items].any?
      if order[:total] < 50
        5
      else
        0
      end
    else
      0
    end
  else
    0
  end
end
