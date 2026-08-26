[
  {~S{least_interval(["A","A","A","B","B","B"], 2)}, inspect(8),
   inspect(Solution.least_interval(["A", "A", "A", "B", "B", "B"], 2))},
  {~S{least_interval(["A","A","A","B","B","B"], 0)}, inspect(6),
   inspect(Solution.least_interval(["A", "A", "A", "B", "B", "B"], 0))},
  {~S{least_interval(["A","A","A","B","B","B"], 3)}, inspect(10),
   inspect(Solution.least_interval(["A", "A", "A", "B", "B", "B"], 3))},
  {"least_interval([], 2)", inspect(0), inspect(Solution.least_interval([], 2))},
  {~S{least_interval(["A"], 5)}, inspect(1), inspect(Solution.least_interval(["A"], 5))},
  {"least_interval(four As and six singles, 2)", inspect(10),
   inspect(
     Solution.least_interval(["A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2)
   )}
]
