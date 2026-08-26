board = fn rows -> Enum.map(rows, &String.graphemes/1) end

[
  {"num_islands(one big island)", inspect(1),
   inspect(Solution.num_islands(board.(["11110", "11010", "11000", "00000"])))},
  {"num_islands(three islands)", inspect(3),
   inspect(Solution.num_islands(board.(["11000", "11000", "00100", "00011"])))},
  {"num_islands(all water)", inspect(0), inspect(Solution.num_islands(board.(["000", "000"])))},
  {"num_islands([])", inspect(0), inspect(Solution.num_islands([]))},
  {"num_islands(diagonal squares are separate)", inspect(2),
   inspect(Solution.num_islands(board.(["10", "01"])))}
]
