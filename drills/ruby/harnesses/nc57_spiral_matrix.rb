need :spiral_order

tc "spiral_order([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", [1, 2, 3, 6, 9, 8, 7, 4, 5],
   spiral_order([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
tc "spiral_order([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])", [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
   spiral_order([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
tc "spiral_order([[1]])", [1], spiral_order([[1]])
tc "spiral_order([])", [], spiral_order([])
tc "spiral_order([[1, 2, 3]])", [1, 2, 3], spiral_order([[1, 2, 3]])
tc "spiral_order([[1], [2], [3]])", [1, 2, 3], spiral_order([[1], [2], [3]])
