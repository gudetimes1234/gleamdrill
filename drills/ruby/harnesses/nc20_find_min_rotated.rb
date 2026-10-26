need :find_min

tc "find_min([3, 4, 5, 1, 2])", 1, find_min([3, 4, 5, 1, 2])
tc "find_min([4, 5, 6, 7, 0, 1, 2])", 0, find_min([4, 5, 6, 7, 0, 1, 2])
tc "find_min([11, 13, 15, 17])", 11, find_min([11, 13, 15, 17])
tc "find_min([2, 1])", 1, find_min([2, 1])
