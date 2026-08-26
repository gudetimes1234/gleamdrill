# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"diameter_of_binary_tree(the 1/2/3 tree)", inspect(3),
   inspect(Solution.diameter_of_binary_tree({1, {2, bud.(4), bud.(5)}, bud.(3)}))},
  {"diameter_of_binary_tree(nil)", inspect(0),
   inspect(Solution.diameter_of_binary_tree(nil))},
  {"diameter_of_binary_tree(a single node)", inspect(0),
   inspect(Solution.diameter_of_binary_tree(bud.(1)))},
  {"diameter_of_binary_tree(one child)", inspect(1),
   inspect(Solution.diameter_of_binary_tree({1, bud.(2), nil}))},
  {"diameter_of_binary_tree(widest path misses the root)", inspect(4),
   inspect(Solution.diameter_of_binary_tree({1, {2, {4, bud.(6), nil}, {5, nil, bud.(7)}}, nil}))}
]
