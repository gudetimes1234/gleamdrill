need :min_interval

tc "min_interval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5])", [3, 3, 1, 4],
   min_interval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5])
tc "min_interval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22])", [2, -1, 4, 6],
   min_interval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22])
tc "min_interval([], [1, 2])", [-1, -1], min_interval([], [1, 2])
tc "min_interval([[1, 10]], [])", [], min_interval([[1, 10]], [])
tc "min_interval([[1, 3]], [0, 4])", [-1, -1], min_interval([[1, 3]], [0, 4])
