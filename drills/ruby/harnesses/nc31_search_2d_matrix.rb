need :search_matrix

matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]

tc "search_matrix(matrix, 3)", true, search_matrix(matrix, 3)
tc "search_matrix(matrix, 13)", false, search_matrix(matrix, 13)
tc "search_matrix(matrix, 60)", true, search_matrix(matrix, 60)
tc "search_matrix([[1]], 1)", true, search_matrix([[1]], 1)
tc "search_matrix([], 1)", false, search_matrix([], 1)
tc "search_matrix([[1], [3], [5]], 5)", true, search_matrix([[1], [3], [5]], 5)
