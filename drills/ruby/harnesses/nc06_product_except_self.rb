need :product_except_self

tc "product_except_self([1, 2, 3, 4])", [24, 12, 8, 6], product_except_self([1, 2, 3, 4])
tc "product_except_self([-1, 1, 0, -3, 3])", [0, 0, 9, 0, 0], product_except_self([-1, 1, 0, -3, 3])
tc "product_except_self([2, 3])", [3, 2], product_except_self([2, 3])
