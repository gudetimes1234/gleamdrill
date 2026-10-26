need :contains_duplicate

tc "contains_duplicate([1, 2, 3, 1])", true, contains_duplicate([1, 2, 3, 1])
tc "contains_duplicate([1, 2, 3, 4])", false, contains_duplicate([1, 2, 3, 4])
tc "contains_duplicate([])", false, contains_duplicate([])
