need :count_components

tc "count_components(5, [[0, 1], [1, 2], [3, 4]])", 2, count_components(5, [[0, 1], [1, 2], [3, 4]])
tc "count_components(5, [[0, 1], [1, 2], [2, 3], [3, 4]])", 1, count_components(5, [[0, 1], [1, 2], [2, 3], [3, 4]])
tc "count_components(3, [])", 3, count_components(3, [])
tc "count_components(0, [])", 0, count_components(0, [])
tc "count_components(1, [])", 1, count_components(1, [])
tc "count_components(4, [[0, 1], [1, 0]])", 3, count_components(4, [[0, 1], [1, 0]])
