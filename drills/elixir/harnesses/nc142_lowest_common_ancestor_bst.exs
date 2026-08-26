# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

bst = {6, {2, bud.(0), {4, bud.(3), bud.(5)}}, {8, bud.(7), bud.(9)}}

[
  {"lowest_common_ancestor(bst, 2, 8)", inspect(6),
   inspect(Solution.lowest_common_ancestor(bst, 2, 8))},
  {"lowest_common_ancestor(bst, 2, 4) -- an ancestor counts", inspect(2),
   inspect(Solution.lowest_common_ancestor(bst, 2, 4))},
  {"lowest_common_ancestor(bst, 3, 5)", inspect(4),
   inspect(Solution.lowest_common_ancestor(bst, 3, 5))},
  {"lowest_common_ancestor(bst, 7, 9)", inspect(8),
   inspect(Solution.lowest_common_ancestor(bst, 7, 9))},
  {"lowest_common_ancestor(a single node, 1, 1)", inspect(1),
   inspect(Solution.lowest_common_ancestor(bud.(1), 1, 1))}
]
