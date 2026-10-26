need :set_zeroes

tc "set_zeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]])", [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
   set_zeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]])
tc "set_zeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])", [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]],
   set_zeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])
tc "set_zeroes([[1]])", [[1]], set_zeroes([[1]])
tc "set_zeroes([[0]])", [[0]], set_zeroes([[0]])
tc "set_zeroes([])", [], set_zeroes([])
tc "set_zeroes([[1, 2], [3, 4]])", [[1, 2], [3, 4]], set_zeroes([[1, 2], [3, 4]])
