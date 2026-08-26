store =
  Solution.new()
  |> Solution.add({3, 10})
  |> Solution.add({11, 2})
  |> Solution.add({3, 2})

doubled = Solution.add(store, {11, 2})

unit =
  Solution.new()
  |> Solution.add({0, 1})
  |> Solution.add({1, 0})
  |> Solution.add({1, 1})

[
  {"count({11, 10}) with one of each corner", inspect(1),
   inspect(Solution.count(store, {11, 10}))},
  {"count({14, 8}) -- no square", inspect(0), inspect(Solution.count(store, {14, 8}))},
  {"count({11, 10}) after adding {11, 2} twice", inspect(2),
   inspect(Solution.count(doubled, {11, 10}))},
  {"count on an empty store", inspect(0), inspect(Solution.count(Solution.new(), {0, 0}))},
  {"count({0, 0}) on the unit square", inspect(1), inspect(Solution.count(unit, {0, 0}))}
]
