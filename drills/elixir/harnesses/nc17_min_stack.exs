stack = Solution.new() |> Solution.push(-2) |> Solution.push(0) |> Solution.push(-3)
popped = Solution.pop(stack)

[
  {"get_min() after push -2, 0, -3", inspect(-3), inspect(Solution.get_min(stack))},
  {"top() after pop()", inspect(0), inspect(Solution.top(popped))},
  {"get_min() after pop()", inspect(-2), inspect(Solution.get_min(popped))},
  {"top() on an empty stack", inspect(nil), inspect(Solution.top(Solution.new()))}
]
