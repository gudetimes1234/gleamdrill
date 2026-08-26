# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"max_depth(the 3/9/20 tree)", inspect(3),
   inspect(Solution.max_depth({3, bud.(9), {20, bud.(15), bud.(7)}}))},
  {"max_depth(nil)", inspect(0),
   inspect(Solution.max_depth(nil))},
  {"max_depth(a single node)", inspect(1),
   inspect(Solution.max_depth(bud.(1)))},
  {"max_depth(a spindly tree)", inspect(3),
   inspect(Solution.max_depth({1, {2, bud.(3), nil}, nil}))}
]
