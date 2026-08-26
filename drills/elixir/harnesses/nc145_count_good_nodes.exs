# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"good_nodes(the 3/1/4 tree)", inspect(4),
   inspect(Solution.good_nodes({3, {1, bud.(3), nil}, {4, bud.(1), bud.(5)}}))},
  {"good_nodes(nil)", inspect(0),
   inspect(Solution.good_nodes(nil))},
  {"good_nodes(a single node)", inspect(1),
   inspect(Solution.good_nodes(bud.(1)))},
  {"good_nodes(equal counts as good)", inspect(2),
   inspect(Solution.good_nodes({2, bud.(2), nil}))},
  {"good_nodes(a smaller node hides nothing below it)", inspect(3),
   inspect(Solution.good_nodes({3, {3, bud.(4), bud.(2)}, nil}))}
]
