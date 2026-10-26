need :shipping_city

order = { id: 7, customer: { name: "Ann", shipping: { city: "Lyon" } } }
tc "shipping_city(order)", "Lyon", shipping_city(order)
tc "shipping_city(no shipping address)", nil, shipping_city({ customer: { name: "Bo" } })
tc "shipping_city({}) -- no customer", nil, shipping_city({})
uses(/\.dig\b/, "dig")
avoids(/\brescue\b/, "rescue NoMethodError")
