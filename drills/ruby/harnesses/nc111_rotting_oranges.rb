need :oranges_rotting

tc "oranges_rotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])", 4, oranges_rotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])
tc "oranges_rotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])", -1, oranges_rotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])
tc "oranges_rotting([[0, 2]])", 0, oranges_rotting([[0, 2]])
tc "oranges_rotting([])", 0, oranges_rotting([])
tc "oranges_rotting([[1]])", -1, oranges_rotting([[1]])
tc "oranges_rotting([[0]])", 0, oranges_rotting([[0]])
