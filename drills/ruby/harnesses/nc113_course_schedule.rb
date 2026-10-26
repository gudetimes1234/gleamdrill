need :can_finish

tc "can_finish(2, [[1, 0]])", true, can_finish(2, [[1, 0]])
tc "can_finish(2, [[1, 0], [0, 1]])", false, can_finish(2, [[1, 0], [0, 1]])
tc "can_finish(1, [])", true, can_finish(1, [])
tc "can_finish(0, [])", true, can_finish(0, [])
tc "can_finish(4, [[1, 0], [2, 1], [3, 2]])", true, can_finish(4, [[1, 0], [2, 1], [3, 2]])
tc "can_finish(3, [[0, 1], [1, 2], [2, 0]])", false, can_finish(3, [[0, 1], [1, 2], [2, 0]])
