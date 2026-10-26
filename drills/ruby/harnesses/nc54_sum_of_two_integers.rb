need :get_sum

tc "get_sum(1, 2)", 3, get_sum(1, 2)
tc "get_sum(2, 3)", 5, get_sum(2, 3)
tc "get_sum(-1, 1)", 0, get_sum(-1, 1)
tc "get_sum(-2, -3)", -5, get_sum(-2, -3)
tc "get_sum(0, 0)", 0, get_sum(0, 0)
tc "get_sum(-1, -1)", -2, get_sum(-1, -1)
tc "get_sum(5, -3)", 2, get_sum(5, -3)
