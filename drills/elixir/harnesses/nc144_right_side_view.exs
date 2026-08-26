# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"right_side_view(the 1/2/3 tree)", inspect([1, 3, 4]),
   inspect(Solution.right_side_view({1, {2, nil, bud.(5)}, {3, nil, bud.(4)}}))},
  {"right_side_view(nil)", inspect([]),
   inspect(Solution.right_side_view(nil))},
  {"right_side_view(a single node)", inspect([1]),
   inspect(Solution.right_side_view(bud.(1)))},
  {"right_side_view(the right side runs out)", inspect([1, 3, 4]),
   inspect(Solution.right_side_view({1, {2, bud.(4), nil}, bud.(3)}))}
]
