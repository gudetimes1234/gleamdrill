need :two_sum

tc "two_sum([2, 7, 11, 15], 9)", [1, 2], two_sum([2, 7, 11, 15], 9)
tc "two_sum([2, 3, 4], 6)", [1, 3], two_sum([2, 3, 4], 6)
tc "two_sum([-1, 0], -1)", [1, 2], two_sum([-1, 0], -1)
tc "two_sum([1, 2, 3], 100)", [], two_sum([1, 2, 3], 100)
