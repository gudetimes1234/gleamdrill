# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

bst = {3, {1, nil, bud.(2)}, bud.(4)}

[
  {"kth_smallest(bst, 1)", inspect(1),
   inspect(Solution.kth_smallest(bst, 1))},
  {"kth_smallest(bst, 2)", inspect(2),
   inspect(Solution.kth_smallest(bst, 2))},
  {"kth_smallest(bst, 3)", inspect(3),
   inspect(Solution.kth_smallest(bst, 3))},
  {"kth_smallest(bst, 4)", inspect(4),
   inspect(Solution.kth_smallest(bst, 4))},
  {"kth_smallest(a single node, 1)", inspect(7),
   inspect(Solution.kth_smallest(bud.(7), 1))}
]
