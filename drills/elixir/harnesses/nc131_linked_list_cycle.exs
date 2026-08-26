[
  {"has_cycle([1, 2, 3, 1]) -- the tail loops back", inspect(true),
   inspect(Solution.has_cycle([1, 2, 3, 1]))},
  {"has_cycle([1, 2, -1])", inspect(false),
   inspect(Solution.has_cycle([1, 2, -1]))},
  {"has_cycle([-1]) -- one node, no link", inspect(false),
   inspect(Solution.has_cycle([-1]))},
  {"has_cycle([0]) -- one node pointing at itself", inspect(true),
   inspect(Solution.has_cycle([0]))},
  {"has_cycle([])", inspect(false),
   inspect(Solution.has_cycle([]))},
  {"has_cycle([1, 0]) -- two nodes pointing at each other", inspect(true),
   inspect(Solution.has_cycle([1, 0]))}
]
