need :orders_by_status

Order = Struct.new(:id, :status)
a = Order.new(1, :paid)
b = Order.new(2, :shipped)
c = Order.new(3, :paid)
tc "orders_by_status([a, b, c])", { paid: [a, c], shipped: [b] }, orders_by_status([a, b, c])
tc "orders_by_status([])", {}, orders_by_status([])
tc "orders_by_status([b])", { shipped: [b] }, orders_by_status([b])
uses(/\.group_by\b/, "group_by")
avoids(/\.each\b/, "each loop")
avoids(/<</, "pushing into buckets")
