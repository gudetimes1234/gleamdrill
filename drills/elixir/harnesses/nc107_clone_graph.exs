[
  {"clone_graph([[1,3],[0,2],[1,3],[0,2]], 0)", inspect([[1, 3], [0, 2], [1, 3], [0, 2]]),
   inspect(Solution.clone_graph([[1, 3], [0, 2], [1, 3], [0, 2]], 0))},
  {"clone_graph([[1],[0]], 0)", inspect([[1], [0]]),
   inspect(Solution.clone_graph([[1], [0]], 0))},
  {"clone_graph([[]], 0)", inspect([[]]), inspect(Solution.clone_graph([[]], 0))},
  {"clone_graph([], 0)", inspect([]), inspect(Solution.clone_graph([], 0))},
  {"clone_graph([[1],[0],[3],[2]], 2) -- renumbered", inspect([[1], [0]]),
   inspect(Solution.clone_graph([[1], [0], [3], [2]], 2))},
  {"clone_graph([[],[]], 1) -- only the reachable part", inspect([[]]),
   inspect(Solution.clone_graph([[], []], 1))}
]
