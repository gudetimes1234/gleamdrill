[
  {"find_cheapest_price(4, the loop example, 0, 3, 1)", inspect(700),
   inspect(
     Solution.find_cheapest_price(
       4,
       [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]],
       0,
       3,
       1
     )
   )},
  {"find_cheapest_price(3, two hops allowed, 0, 2, 1)", inspect(200),
   inspect(
     Solution.find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1)
   )},
  {"find_cheapest_price(3, no stop allowed, 0, 2, 0)", inspect(500),
   inspect(
     Solution.find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0)
   )},
  {"find_cheapest_price(2, no flights at all, 0, 1, 5)", inspect(-1),
   inspect(Solution.find_cheapest_price(2, [], 0, 1, 5))},
  {"find_cheapest_price(1, already there, 0, 0, 0)", inspect(0),
   inspect(Solution.find_cheapest_price(1, [], 0, 0, 0))},
  {"find_cheapest_price(5, cheapest route needs the third hop, 0, 2, 2)", inspect(7),
   inspect(
     Solution.find_cheapest_price(
       5,
       [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]],
       0,
       2,
       2
     )
   )}
]
