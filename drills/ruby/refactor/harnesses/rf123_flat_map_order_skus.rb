need :skus

Order = Struct.new(:id, :lines)
tc 'skus([order 1 [A1, B2], order 2 [C3]])', ["A1", "B2", "C3"], skus([Order.new(1, ["A1", "B2"]), Order.new(2, ["C3"])])
tc 'skus([order 1 []]) -- an empty order', [], skus([Order.new(1, [])])
tc "skus([])", [], skus([])
uses(/\.flat_map\b/, "flat_map")
avoids(/\.each\b/, "each loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
