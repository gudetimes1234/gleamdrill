# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"is_subtree(4/1/2 inside 3/4/5)", inspect(true),
   inspect(Solution.is_subtree({3, {4, bud.(1), bud.(2)}, bud.(5)}, {4, bud.(1), bud.(2)}))},
  {"is_subtree(a near match with an extra node)", inspect(false),
   inspect(Solution.is_subtree({3, {4, bud.(1), {2, bud.(0), nil}}, bud.(5)}, {4, bud.(1), bud.(2)}))},
  {"is_subtree(a tree is its own subtree)", inspect(true),
   inspect(Solution.is_subtree(bud.(1), bud.(1)))},
  {"is_subtree(nil, a node)", inspect(false),
   inspect(Solution.is_subtree(nil, bud.(1)))},
  {"is_subtree(anything, nil)", inspect(true),
   inspect(Solution.is_subtree(bud.(1), nil))}
]
