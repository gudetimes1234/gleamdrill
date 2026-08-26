[
  {"erase_overlap_intervals([{1, 2}, {2, 3}, {3, 4}, {1, 3}])", inspect(1),
   inspect(Solution.erase_overlap_intervals([{1, 2}, {2, 3}, {3, 4}, {1, 3}]))},
  {"erase_overlap_intervals([{1, 2}, {1, 2}, {1, 2}])", inspect(2),
   inspect(Solution.erase_overlap_intervals([{1, 2}, {1, 2}, {1, 2}]))},
  {"erase_overlap_intervals([{1, 2}, {2, 3}])", inspect(0),
   inspect(Solution.erase_overlap_intervals([{1, 2}, {2, 3}]))},
  {"erase_overlap_intervals([])", inspect(0), inspect(Solution.erase_overlap_intervals([]))},
  {"erase_overlap_intervals([{1, 100}, {11, 22}, {1, 11}, {2, 12}])", inspect(2),
   inspect(Solution.erase_overlap_intervals([{1, 100}, {11, 22}, {1, 11}, {2, 12}]))}
]
