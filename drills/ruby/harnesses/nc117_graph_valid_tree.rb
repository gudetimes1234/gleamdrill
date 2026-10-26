need :valid_tree

tc "valid_tree(5, [[0, 1], [0, 2], [0, 3], [1, 4]])", true, valid_tree(5, [[0, 1], [0, 2], [0, 3], [1, 4]])
tc "valid_tree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]])", false, valid_tree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]])
tc "valid_tree(1, [])", true, valid_tree(1, [])
tc "valid_tree(0, [])", true, valid_tree(0, [])
tc "valid_tree(2, []) -- disconnected", false, valid_tree(2, [])
tc "valid_tree(4, [[0, 1], [2, 3]]) -- two trees", false, valid_tree(4, [[0, 1], [2, 3]])
