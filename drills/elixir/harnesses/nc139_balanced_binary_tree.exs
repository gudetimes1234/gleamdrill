# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"is_balanced(the 3/9/20 tree)", inspect(true),
   inspect(Solution.is_balanced({3, bud.(9), {20, bud.(15), bud.(7)}}))},
  {"is_balanced(nil)", inspect(true),
   inspect(Solution.is_balanced(nil))},
  {"is_balanced(a single node)", inspect(true),
   inspect(Solution.is_balanced(bud.(1)))},
  {"is_balanced(the classic unbalanced tree)", inspect(false),
   inspect(Solution.is_balanced({1, {2, {3, bud.(4), bud.(4)}, bud.(3)}, bud.(2)}))},
  {"is_balanced(balanced at the root, not below)", inspect(false),
   inspect(Solution.is_balanced({1, {2, {3, bud.(4), nil}, nil}, bud.(2)}))}
]
