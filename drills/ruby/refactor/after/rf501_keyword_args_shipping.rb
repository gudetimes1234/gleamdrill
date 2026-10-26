def shipping_cost(weight, express: false, insured: false)
  cost = weight * 2.0
  cost *= 2 if express
  cost += 5 if insured
  cost
end
