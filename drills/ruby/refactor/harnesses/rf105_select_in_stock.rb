need :in_stock

Product = Struct.new(:name, :stock)
mug = Product.new("mug", 4)
lamp = Product.new("lamp", 0)
desk = Product.new("desk", 1)
tc "in_stock([mug(4), lamp(0), desk(1)])", [mug, desk], in_stock([mug, lamp, desk])
tc "in_stock([lamp(0)]) -- sold out", [], in_stock([lamp])
tc "in_stock([])", [], in_stock([])
uses(/\.(select|filter)\b/, "select")
avoids(/\bwhile\b/, "while loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
