# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"build_tree([3,9,20,15,7], [9,3,15,20,7])", inspect({3, bud.(9), {20, bud.(15), bud.(7)}}),
   inspect(Solution.build_tree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))},
  {"build_tree([], [])", inspect(nil),
   inspect(Solution.build_tree([], []))},
  {"build_tree([-1], [-1])", inspect(bud.(-1)),
   inspect(Solution.build_tree([-1], [-1]))},
  {"build_tree([1,2,3], [3,2,1]) -- leaning left", inspect({1, {2, bud.(3), nil}, nil}),
   inspect(Solution.build_tree([1, 2, 3], [3, 2, 1]))},
  {"build_tree([1,2,3], [1,2,3]) -- leaning right", inspect({1, nil, {2, nil, bud.(3)}}),
   inspect(Solution.build_tree([1, 2, 3], [1, 2, 3]))}
]
