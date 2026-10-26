need :find_kth_largest

tc "find_kth_largest([3, 2, 1, 5, 6, 4], 2)", 5, find_kth_largest([3, 2, 1, 5, 6, 4], 2)
tc "find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)", 4, find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)
tc "find_kth_largest([1], 1)", 1, find_kth_largest([1], 1)
tc "find_kth_largest([2, 1], 2)", 1, find_kth_largest([2, 1], 2)
tc "find_kth_largest([7, 6, 5, 4, 3, 2, 1], 3)", 5, find_kth_largest([7, 6, 5, 4, 3, 2, 1], 3)
tc "find_kth_largest([], 1)", nil, find_kth_largest([], 1)
