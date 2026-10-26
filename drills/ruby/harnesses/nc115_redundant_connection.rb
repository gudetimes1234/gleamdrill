need :find_redundant_connection

tc "find_redundant_connection([[1, 2], [1, 3], [2, 3]])", [2, 3], find_redundant_connection([[1, 2], [1, 3], [2, 3]])
tc "find_redundant_connection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])", [1, 4],
   find_redundant_connection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])
tc "find_redundant_connection([[1, 2], [2, 1]])", [2, 1], find_redundant_connection([[1, 2], [2, 1]])
