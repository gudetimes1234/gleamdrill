need :pacific_atlantic

def grid = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]

tc "pacific_atlantic(the 5x5 example)", [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]], pacific_atlantic(grid).sort
tc "pacific_atlantic([[1]])", [[0, 0]], pacific_atlantic([[1]]).sort
tc "pacific_atlantic([])", [], pacific_atlantic([]).sort
tc "pacific_atlantic([[1, 1], [1, 1]])", [[0, 0], [0, 1], [1, 0], [1, 1]], pacific_atlantic([[1, 1], [1, 1]]).sort
