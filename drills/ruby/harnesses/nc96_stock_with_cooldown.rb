need :max_profit

tc "max_profit([1, 2, 3, 0, 2])", 3, max_profit([1, 2, 3, 0, 2])
tc "max_profit([1])", 0, max_profit([1])
tc "max_profit([])", 0, max_profit([])
tc "max_profit([2, 1])", 0, max_profit([2, 1])
tc "max_profit([1, 2, 3, 4, 5])", 4, max_profit([1, 2, 3, 4, 5])
tc "max_profit([6, 1, 3, 2, 4, 7])", 6, max_profit([6, 1, 3, 2, 4, 7])
