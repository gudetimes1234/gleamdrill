# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"invert_tree(the 4/2/7 tree)", inspect({4, {7, bud.(9), bud.(6)}, {2, bud.(3), bud.(1)}}),
   inspect(Solution.invert_tree({4, {2, bud.(1), bud.(3)}, {7, bud.(6), bud.(9)}}))},
  {"invert_tree(nil)", inspect(nil),
   inspect(Solution.invert_tree(nil))},
  {"invert_tree(a single node)", inspect(bud.(1)),
   inspect(Solution.invert_tree(bud.(1)))},
  {"invert_tree twice is the original", inspect({1, bud.(2), nil}),
   inspect(Solution.invert_tree(Solution.invert_tree({1, bud.(2), nil})))}
]
