need :find_cheapest_price

tc "find_cheapest_price(4, the loop example, 0, 3, 1)", 700,
   find_cheapest_price(4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1)
tc "find_cheapest_price(3, two hops allowed, 0, 2, 1)", 200, find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1)
tc "find_cheapest_price(3, no stop allowed, 0, 2, 0)", 500, find_cheapest_price(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0)
tc "find_cheapest_price(2, no flights at all, 0, 1, 5)", -1, find_cheapest_price(2, [], 0, 1, 5)
tc "find_cheapest_price(1, already there, 0, 0, 0)", 0, find_cheapest_price(1, [], 0, 0, 0)
tc "find_cheapest_price(5, cheapest route needs the third hop, 0, 2, 2)", 7,
   find_cheapest_price(5, [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]], 0, 2, 2)
