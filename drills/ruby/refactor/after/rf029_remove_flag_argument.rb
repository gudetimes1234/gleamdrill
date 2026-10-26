def rush_delivery_date(order)
  order[:placed] + (near?(order) ? 1 : 2)
end

def regular_delivery_date(order)
  order[:placed] + (near?(order) ? 2 : 3)
end

def near?(order)
  %w[MA CT].include?(order[:state])
end
