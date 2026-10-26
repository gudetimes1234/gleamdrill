need :two_sum

tc "two_sum([2, 7, 11, 15], 9)", [0, 1], two_sum([2, 7, 11, 15], 9)
tc "two_sum([3, 2, 4], 6)", [1, 2], two_sum([3, 2, 4], 6)
tc "two_sum([3, 3], 6)", [0, 1], two_sum([3, 3], 6)
tc "two_sum([1, 2], 7)", [], two_sum([1, 2], 7)
