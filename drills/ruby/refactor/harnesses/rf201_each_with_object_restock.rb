need :restock_totals

orders = [{ sku: "A1", qty: 2 }, { sku: "B7", qty: 1 }, { sku: "A1", qty: 3 }]
tc "restock_totals(orders)", { "A1" => 5, "B7" => 1 }, restock_totals(orders)
tc "restock_totals([])", {}, restock_totals([])
tc 'restock_totals([{ sku: "Z", qty: 0 }]) -- zero still counts as a key', { "Z" => 0 }, restock_totals([{ sku: "Z", qty: 0 }])
uses(/\.each_with_object\b/, "each_with_object")
avoids(/\.each\b/, "each loop")
avoids(/\bif\b/, "first-time-seen check")
