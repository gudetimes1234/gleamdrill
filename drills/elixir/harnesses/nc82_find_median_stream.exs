medians = fn values ->
  {_finder, answers} =
    Enum.reduce(values, {Solution.new(), []}, fn value, {finder, answers} ->
      finder = Solution.add_num(finder, value)
      {finder, [Solution.find_median(finder) | answers]}
    end)

  Enum.reverse(answers)
end

[
  {"medians of 1, 2, 3", inspect([1.0, 1.5, 2.0]), inspect(medians.([1, 2, 3]))},
  {"medians of 1, 2, 3, 4, 5", inspect([1.0, 1.5, 2.0, 2.5, 3.0]),
   inspect(medians.([1, 2, 3, 4, 5]))},
  {"medians arriving out of order", inspect([5.0, 3.0, 2.0, 2.5]),
   inspect(medians.([5, 1, 2, 3]))},
  {"medians of negatives", inspect([-1.0, -1.5]), inspect(medians.([-1, -2]))},
  {"median before anything is added", inspect(0.0),
   inspect(Solution.find_median(Solution.new()))}
]
