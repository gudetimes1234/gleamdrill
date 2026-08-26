[
  {"merge([{1, 3}, {2, 6}, {8, 10}, {15, 18}])", inspect([{1, 6}, {8, 10}, {15, 18}]),
   inspect(Solution.merge([{1, 3}, {2, 6}, {8, 10}, {15, 18}]))},
  {"merge([{1, 4}, {4, 5}])", inspect([{1, 5}]), inspect(Solution.merge([{1, 4}, {4, 5}]))},
  {"merge([])", inspect([]), inspect(Solution.merge([]))},
  {"merge([{1, 4}, {0, 4}])", inspect([{0, 4}]), inspect(Solution.merge([{1, 4}, {0, 4}]))},
  {"merge([{1, 4}, {2, 3}])", inspect([{1, 4}]), inspect(Solution.merge([{1, 4}, {2, 3}]))}
]
