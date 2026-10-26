need :cheapest

flights = [{ to: "OSL", price: 120 }, { to: "LIS", price: 45 }, { to: "ROM", price: 80 }]
tc "cheapest(flights)", { to: "LIS", price: 45 }, cheapest(flights)
tc "cheapest([]) -- no flights is nil", nil, cheapest([])
tc "cheapest([one])", { to: "NYC", price: 300 }, cheapest([{ to: "NYC", price: 300 }])
uses(/\.min_by\b/, "min_by")
avoids(/\bwhile\b/, "while loop")
avoids(/\[i\]|\[best\]/, "tracking the best index")
