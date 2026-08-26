# Trees are written out directly: nil for empty, {value, left, right} for a
# node. `bud` is a node with no children.
bud = fn value -> {value, nil, nil} end

# The format is free, so what is checked is the round trip.
round_trip = fn tree -> Solution.deserialize(Solution.serialize(tree)) end

[
  {"deserialize(serialize(1/2/3-4-5))", inspect({1, bud.(2), {3, bud.(4), bud.(5)}}),
   inspect(round_trip.({1, bud.(2), {3, bud.(4), bud.(5)}}))},
  {"deserialize(serialize(nil))", inspect(nil),
   inspect(round_trip.(nil))},
  {"deserialize(serialize(a single zero))", inspect(bud.(0)),
   inspect(round_trip.(bud.(0)))},
  {"deserialize(serialize(a lopsided tree))", inspect({1, {2, {3, nil, bud.(4)}, nil}, nil}),
   inspect(round_trip.({1, {2, {3, nil, bud.(4)}, nil}, nil}))},
  {"deserialize(serialize(negative values))", inspect({-1, bud.(-2), bud.(-3)}),
   inspect(round_trip.({-1, bud.(-2), bud.(-3)}))}
]
