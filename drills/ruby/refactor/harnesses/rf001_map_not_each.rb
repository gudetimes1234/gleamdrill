need :with_tax

tc "with_tax([10, 2.5])", [12.0, 3.0], with_tax([10, 2.5])
tc "with_tax([]) -- nothing in, nothing out", [], with_tax([])
tc "with_tax([0.99])", [1.19], with_tax([0.99])
uses(/\.map\b/, "map")
avoids(/\.each\b/, "each loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
