[
  {"rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", inspect([[7, 4, 1], [8, 5, 2], [9, 6, 3]]), inspect(Solution.rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))},
  {"rotate([[1, 2], [3, 4]])", inspect([[3, 1], [4, 2]]), inspect(Solution.rotate([[1, 2], [3, 4]]))},
  {"rotate([[1]])", inspect([[1]]), inspect(Solution.rotate([[1]]))},
  {"rotate([])", inspect([]), inspect(Solution.rotate([]))},
  {"rotate(4x4)", inspect([[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]), inspect(Solution.rotate([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]))}
]
