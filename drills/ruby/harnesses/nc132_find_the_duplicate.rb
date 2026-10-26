need :find_duplicate

tc "find_duplicate([1, 3, 4, 2, 2])", 2, find_duplicate([1, 3, 4, 2, 2])
tc "find_duplicate([3, 1, 3, 4, 2])", 3, find_duplicate([3, 1, 3, 4, 2])
tc "find_duplicate([1, 1])", 1, find_duplicate([1, 1])
tc "find_duplicate([2, 2, 2, 2, 2]) -- repeated more than twice", 2, find_duplicate([2, 2, 2, 2, 2])
tc "find_duplicate([1, 4, 4, 2, 4])", 4, find_duplicate([1, 4, 4, 2, 4])
