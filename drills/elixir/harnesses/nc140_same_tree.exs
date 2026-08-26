# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"is_same_tree(two identical trees)", inspect(true),
   inspect(Solution.is_same_tree({1, bud.(2), bud.(3)}, {1, bud.(2), bud.(3)}))},
  {"is_same_tree(nil, nil)", inspect(true),
   inspect(Solution.is_same_tree(nil, nil))},
  {"is_same_tree(nil, a node)", inspect(false),
   inspect(Solution.is_same_tree(nil, bud.(1)))},
  {"is_same_tree(same values, mirrored)", inspect(false),
   inspect(Solution.is_same_tree({1, bud.(2), nil}, {1, nil, bud.(2)}))},
  {"is_same_tree(children swapped)", inspect(false),
   inspect(Solution.is_same_tree({1, bud.(2), bud.(1)}, {1, bud.(1), bud.(2)}))}
]
