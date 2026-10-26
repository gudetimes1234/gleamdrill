need :swim_in_water

tc "swim_in_water([[0, 2], [1, 3]])", 3, swim_in_water([[0, 2], [1, 3]])
tc "swim_in_water(the 5x5 spiral)", 16,
   swim_in_water([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]])
tc "swim_in_water([[0]])", 0, swim_in_water([[0]])
tc "swim_in_water([[3, 2], [1, 0]]) -- the start is the deepest cell", 3, swim_in_water([[3, 2], [1, 0]])
