# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"level_order(the 3/9/20 tree)", inspect([[3], [9, 20], [15, 7]]),
   inspect(Solution.level_order({3, bud.(9), {20, bud.(15), bud.(7)}}))},
  {"level_order(nil)", inspect([]),
   inspect(Solution.level_order(nil))},
  {"level_order(a single node)", inspect([[1]]),
   inspect(Solution.level_order(bud.(1)))},
  {"level_order(missing left children)", inspect([[1], [3], [4]]),
   inspect(Solution.level_order({1, nil, {3, nil, bud.(4)}}))}
]
