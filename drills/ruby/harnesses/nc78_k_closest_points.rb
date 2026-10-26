need :k_closest

# Any order is acceptable, so every case compares sorted.
def sorted_closest(points, k) = k_closest(points, k).map(&:to_a).sort

tc "k_closest([[1, 3], [-2, 2]], 1)", [[-2, 2]], sorted_closest([[1, 3], [-2, 2]], 1)
tc "k_closest([[3, 3], [5, -1], [-2, 4]], 2)", [[-2, 4], [3, 3]], sorted_closest([[3, 3], [5, -1], [-2, 4]], 2)
tc "k_closest([], 0)", [], sorted_closest([], 0)
tc "k_closest([[0, 0]], 1)", [[0, 0]], sorted_closest([[0, 0]], 1)
tc "k_closest([[1, 1], [2, 2], [3, 3]], 2)", [[1, 1], [2, 2]], sorted_closest([[1, 1], [2, 2], [3, 3]], 2)
