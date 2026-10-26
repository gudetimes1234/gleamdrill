need :total_quantity

tc "total_quantity([{ qty: 2 }, { qty: 5 }])", 7, total_quantity([{ qty: 2 }, { qty: 5 }])
tc "total_quantity([]) -- an empty basket is 0", 0, total_quantity([])
tc "total_quantity([{ qty: 1 }])", 1, total_quantity([{ qty: 1 }])
uses(/\.sum\b/, "sum")
avoids(/\.each\b/, "each loop")
avoids(/\+=/, "running total")
