need :missing_number

tc "missing_number([3, 0, 1])", 2, missing_number([3, 0, 1])
tc "missing_number([0, 1])", 2, missing_number([0, 1])
tc "missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1])", 8, missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1])
tc "missing_number([0])", 1, missing_number([0])
tc "missing_number([1])", 0, missing_number([1])
tc "missing_number([])", 0, missing_number([])
