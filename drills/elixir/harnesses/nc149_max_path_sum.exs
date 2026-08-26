# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"max_path_sum(1/2/3)", inspect(6),
   inspect(Solution.max_path_sum({1, bud.(2), bud.(3)}))},
  {"max_path_sum(-10/9/20)", inspect(42),
   inspect(Solution.max_path_sum({-10, bud.(9), {20, bud.(15), bud.(7)}}))},
  {"max_path_sum(a single negative node)", inspect(-3),
   inspect(Solution.max_path_sum(bud.(-3)))},
  {"max_path_sum(all negative)", inspect(-1),
   inspect(Solution.max_path_sum({-2, bud.(-1), nil}))},
  {"max_path_sum(a single zero)", inspect(0),
   inspect(Solution.max_path_sum(bud.(0)))}
]
