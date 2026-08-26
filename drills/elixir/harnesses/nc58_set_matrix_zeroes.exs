[
  {"set_zeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]])", inspect([[1, 0, 1], [0, 0, 0], [1, 0, 1]]), inspect(Solution.set_zeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]]))},
  {"set_zeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])", inspect([[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]), inspect(Solution.set_zeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]))},
  {"set_zeroes([[1]])", inspect([[1]]), inspect(Solution.set_zeroes([[1]]))},
  {"set_zeroes([[0]])", inspect([[0]]), inspect(Solution.set_zeroes([[0]]))},
  {"set_zeroes([])", inspect([]), inspect(Solution.set_zeroes([]))},
  {"set_zeroes([[1, 2], [3, 4]])", inspect([[1, 2], [3, 4]]), inspect(Solution.set_zeroes([[1, 2], [3, 4]]))}
]
