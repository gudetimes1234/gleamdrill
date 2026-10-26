need :network_delay_time

tc "network_delay_time([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)", 2, network_delay_time([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)
tc "network_delay_time([[1, 2, 1]], 2, 1)", 1, network_delay_time([[1, 2, 1]], 2, 1)
tc "network_delay_time([[1, 2, 1]], 2, 2) -- node 1 is unreachable", -1, network_delay_time([[1, 2, 1]], 2, 2)
tc "network_delay_time([], 1, 1)", 0, network_delay_time([], 1, 1)
tc "network_delay_time(the long way round is shorter, 3, 1)", 3, network_delay_time([[1, 2, 1], [2, 3, 2], [1, 3, 4]], 3, 1)
