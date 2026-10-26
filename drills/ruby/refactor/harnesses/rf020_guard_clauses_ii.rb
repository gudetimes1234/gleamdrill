need :shipping_cost

tc "shipping_cost(nil)", 0, shipping_cost(nil)
tc "shipping_cost(no items)", 0, shipping_cost({ items: [], total: 10 })
tc "shipping_cost(small order)", 5, shipping_cost({ items: [1], total: 20 })
tc "shipping_cost(order of 50) -- free from 50", 0, shipping_cost({ items: [1], total: 50 })
uses(/return .+ if /, "guard clauses")
avoids(/\belse\b/, "else")
