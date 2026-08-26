[
  {"add_two_numbers([2, 4, 3], [5, 6, 4]) -- 342 + 465", inspect([7, 0, 8]),
   inspect(Solution.add_two_numbers([2, 4, 3], [5, 6, 4]))},
  {"add_two_numbers([0], [0])", inspect([0]),
   inspect(Solution.add_two_numbers([0], [0]))},
  {"add_two_numbers([9, 9, 9], [1]) -- the carry runs all the way", inspect([0, 0, 0, 1]),
   inspect(Solution.add_two_numbers([9, 9, 9], [1]))},
  {"add_two_numbers([5], [5]) -- the carry outlives both", inspect([0, 1]),
   inspect(Solution.add_two_numbers([5], [5]))},
  {"add_two_numbers([1, 2], [3, 4, 5]) -- different lengths", inspect([4, 6, 5]),
   inspect(Solution.add_two_numbers([1, 2], [3, 4, 5]))}
]
