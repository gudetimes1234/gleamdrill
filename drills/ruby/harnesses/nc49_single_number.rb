need :single_number

tc "single_number([2, 2, 1])", 1, single_number([2, 2, 1])
tc "single_number([4, 1, 2, 1, 2])", 4, single_number([4, 1, 2, 1, 2])
tc "single_number([1])", 1, single_number([1])
tc "single_number([-1, -1, -3])", -3, single_number([-1, -1, -3])
tc "single_number([0, 1, 1])", 0, single_number([0, 1, 1])
