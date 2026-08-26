[
  {"insert([{1, 3}, {6, 9}], {2, 5})", inspect([{1, 5}, {6, 9}]),
   inspect(Solution.insert([{1, 3}, {6, 9}], {2, 5}))},
  {"insert([{1, 2}, {3, 5}, {6, 7}, {8, 10}, {12, 16}], {4, 8})",
   inspect([{1, 2}, {3, 10}, {12, 16}]),
   inspect(Solution.insert([{1, 2}, {3, 5}, {6, 7}, {8, 10}, {12, 16}], {4, 8}))},
  {"insert([], {5, 7})", inspect([{5, 7}]), inspect(Solution.insert([], {5, 7}))},
  {"insert([{1, 5}], {2, 3})", inspect([{1, 5}]), inspect(Solution.insert([{1, 5}], {2, 3}))},
  {"insert([{1, 5}], {6, 8})", inspect([{1, 5}, {6, 8}]),
   inspect(Solution.insert([{1, 5}], {6, 8}))},
  {"insert([{3, 5}], {1, 2})", inspect([{1, 2}, {3, 5}]),
   inspect(Solution.insert([{3, 5}], {1, 2}))}
]
