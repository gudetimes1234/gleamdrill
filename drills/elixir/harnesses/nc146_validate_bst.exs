# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

[
  {"is_valid_bst(2/1/3)", inspect(true),
   inspect(Solution.is_valid_bst({2, bud.(1), bud.(3)}))},
  {"is_valid_bst(nil)", inspect(true),
   inspect(Solution.is_valid_bst(nil))},
  {"is_valid_bst(a single node)", inspect(true),
   inspect(Solution.is_valid_bst(bud.(1)))},
  {"is_valid_bst(5/1/4 with 3 and 6 below 4)", inspect(false),
   inspect(Solution.is_valid_bst({5, bud.(1), {4, bud.(3), bud.(6)}}))},
  {"is_valid_bst(every node beats its parent, but 3 is on the wrong side)", inspect(false),
   inspect(Solution.is_valid_bst({5, bud.(4), {6, bud.(3), bud.(7)}}))},
  {"is_valid_bst(equal values are not allowed)", inspect(false),
   inspect(Solution.is_valid_bst({2, bud.(2), nil}))}
]
