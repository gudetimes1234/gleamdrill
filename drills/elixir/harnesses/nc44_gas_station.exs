[
  {"can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])", inspect(3), inspect(Solution.can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))},
  {"can_complete_circuit([2, 3, 4], [3, 4, 3])", inspect(-1), inspect(Solution.can_complete_circuit([2, 3, 4], [3, 4, 3]))},
  {"can_complete_circuit([5], [4])", inspect(0), inspect(Solution.can_complete_circuit([5], [4]))},
  {"can_complete_circuit([1, 2], [2, 1])", inspect(1), inspect(Solution.can_complete_circuit([1, 2], [2, 1]))},
  {"can_complete_circuit([], [])", inspect(-1), inspect(Solution.can_complete_circuit([], []))},
  {"can_complete_circuit([3, 1, 1], [1, 2, 2])", inspect(0), inspect(Solution.can_complete_circuit([3, 1, 1], [1, 2, 2]))}
]
