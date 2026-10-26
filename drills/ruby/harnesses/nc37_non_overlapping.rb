need :erase_overlap_intervals

tc "erase_overlap_intervals([[1, 2], [2, 3], [3, 4], [1, 3]])", 1, erase_overlap_intervals([[1, 2], [2, 3], [3, 4], [1, 3]])
tc "erase_overlap_intervals([[1, 2], [1, 2], [1, 2]])", 2, erase_overlap_intervals([[1, 2], [1, 2], [1, 2]])
tc "erase_overlap_intervals([[1, 2], [2, 3]])", 0, erase_overlap_intervals([[1, 2], [2, 3]])
tc "erase_overlap_intervals([])", 0, erase_overlap_intervals([])
tc "erase_overlap_intervals([[1, 100], [11, 22], [1, 11], [2, 12]])", 2,
   erase_overlap_intervals([[1, 100], [11, 22], [1, 11], [2, 12]])
