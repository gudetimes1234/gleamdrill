need :max_product

tc "max_product([2, 3, -2, 4])", 6, max_product([2, 3, -2, 4])
tc "max_product([-2, 0, -1])", 0, max_product([-2, 0, -1])
tc "max_product([-2, 3, -4])", 24, max_product([-2, 3, -4])
tc "max_product([0])", 0, max_product([0])
tc "max_product([-2])", -2, max_product([-2])
tc "max_product([2, -5, -2, -4, 3])", 24, max_product([2, -5, -2, -4, 3])
tc "max_product([])", 0, max_product([])
