need :max_coins

tc "max_coins([3, 1, 5, 8])", 167, max_coins([3, 1, 5, 8])
tc "max_coins([1, 5])", 10, max_coins([1, 5])
tc "max_coins([])", 0, max_coins([])
tc "max_coins([5])", 5, max_coins([5])
tc "max_coins([1, 2, 3, 4])", 40, max_coins([1, 2, 3, 4])
