stream = fn k, initial, added ->
  {_store, answers} =
    Enum.reduce(added, {Solution.new(k, initial), []}, fn value, {store, answers} ->
      store = Solution.add(store, value)
      {store, [Solution.kth(store) | answers]}
    end)

  Enum.reverse(answers)
end

[
  {"k = 3 over [4, 5, 8, 2] then 3, 5, 10, 9, 4", inspect([4, 5, 5, 8, 8]),
   inspect(stream.(3, [4, 5, 8, 2], [3, 5, 10, 9, 4]))},
  {"k = 1 over [] then 1, 2, 0", inspect([1, 2, 2]), inspect(stream.(1, [], [1, 2, 0]))},
  {"k = 2 over [] then 5, 5", inspect([nil, 5]), inspect(stream.(2, [], [5, 5]))},
  {"kth before anything is added", inspect(nil), inspect(Solution.kth(Solution.new(2, [])))}
]
