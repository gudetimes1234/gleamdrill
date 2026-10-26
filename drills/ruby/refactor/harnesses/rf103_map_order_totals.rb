need :order_totals

tc "order_totals([{ qty: 2, price: 150 }, { qty: 1, price: 999 }])", [300, 999], order_totals([{ qty: 2, price: 150 }, { qty: 1, price: 999 }])
tc "order_totals([{ qty: 0, price: 500 }]) -- zero quantity", [0], order_totals([{ qty: 0, price: 500 }])
tc "order_totals([])", [], order_totals([])
uses(/\.(map|collect)\b/, "map")
avoids(/each_with_index|\.each\b/, "each loop")
avoids(/Array\.new|\]\s*=[^=>]/, "filling slots by index")
