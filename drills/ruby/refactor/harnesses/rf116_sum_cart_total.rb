need :cart_total

tc "cart_total([{ price: 250, qty: 2 }, { price: 99, qty: 1 }])", 599, cart_total([{ price: 250, qty: 2 }, { price: 99, qty: 1 }])
tc "cart_total([]) -- an empty cart is 0", 0, cart_total([])
tc "cart_total([{ price: 500, qty: 0 }])", 0, cart_total([{ price: 500, qty: 0 }])
uses(/\.sum\b/, "sum")
avoids(/\.each\b/, "each loop")
avoids(/\+=/, "running total")
