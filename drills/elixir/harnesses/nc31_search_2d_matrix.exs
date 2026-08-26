matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

[
  {"search_matrix(matrix, 3)", inspect(true), inspect(Solution.search_matrix(matrix, 3))},
  {"search_matrix(matrix, 13)", inspect(false), inspect(Solution.search_matrix(matrix, 13))},
  {"search_matrix(matrix, 60)", inspect(true), inspect(Solution.search_matrix(matrix, 60))},
  {"search_matrix([[1]], 1)", inspect(true), inspect(Solution.search_matrix([[1]], 1))},
  {"search_matrix([], 1)", inspect(false), inspect(Solution.search_matrix([], 1))},
  {"search_matrix([[1], [3], [5]], 5)", inspect(true),
   inspect(Solution.search_matrix([[1], [3], [5]], 5))}
]
