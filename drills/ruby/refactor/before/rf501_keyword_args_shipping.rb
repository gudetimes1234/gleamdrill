def shipping_cost(weight, options = {})
  express = options[:express] || false
  insured = options[:insured] || false
  cost = weight * 2.0
  cost *= 2 if express
  cost += 5 if insured
  cost
end
