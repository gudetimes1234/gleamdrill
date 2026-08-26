# Any valid order is acceptable, so the harness checks the order rather than
# comparing it: every course appears exactly once, and every prerequisite comes
# before the course that needs it.
valid = fn num_courses, prerequisites ->
  order = Solution.find_order(num_courses, prerequisites)
  at = order |> Enum.with_index() |> Map.new()

  length(order) == num_courses and map_size(at) == num_courses and
    Enum.all?(prerequisites, fn [course, prereq] ->
      Map.get(at, prereq) < Map.get(at, course)
    end)
end

[
  {"find_order(2, [[1, 0]]) is a valid order", inspect(true), inspect(valid.(2, [[1, 0]]))},
  {"find_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]]) is a valid order", inspect(true),
   inspect(valid.(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))},
  {"find_order(1, []) is a valid order", inspect(true), inspect(valid.(1, []))},
  {"find_order(3, []) is a valid order", inspect(true), inspect(valid.(3, []))},
  {"find_order(2, [[0, 1], [1, 0]]) -- a cycle, so no order", inspect([]),
   inspect(Solution.find_order(2, [[0, 1], [1, 0]]))},
  {"find_order(0, [])", inspect([]), inspect(Solution.find_order(0, []))}
]
