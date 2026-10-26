need :longest_increasing_path

tc "longest_increasing_path([[9, 9, 4], [6, 6, 8], [2, 1, 1]])", 4, longest_increasing_path([[9, 9, 4], [6, 6, 8], [2, 1, 1]])
tc "longest_increasing_path([[3, 4, 5], [3, 2, 6], [2, 2, 1]])", 4, longest_increasing_path([[3, 4, 5], [3, 2, 6], [2, 2, 1]])
tc "longest_increasing_path([[1]])", 1, longest_increasing_path([[1]])
tc "longest_increasing_path([])", 0, longest_increasing_path([])
tc "longest_increasing_path([[1, 2], [3, 4]])", 3, longest_increasing_path([[1, 2], [3, 4]])
