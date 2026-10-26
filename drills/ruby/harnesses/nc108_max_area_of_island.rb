need :max_area_of_island

tc "max_area_of_island([[1, 1, 0], [1, 0, 0], [0, 0, 1]])", 3, max_area_of_island([[1, 1, 0], [1, 0, 0], [0, 0, 1]])
tc "max_area_of_island([[0, 0], [0, 0]])", 0, max_area_of_island([[0, 0], [0, 0]])
tc "max_area_of_island([])", 0, max_area_of_island([])
tc "max_area_of_island([[1]])", 1, max_area_of_island([[1]])
tc "max_area_of_island([[1, 1, 1], [1, 1, 1]])", 6, max_area_of_island([[1, 1, 1], [1, 1, 1]])
