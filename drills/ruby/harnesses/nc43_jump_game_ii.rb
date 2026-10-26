need :jump

tc "jump([2, 3, 1, 1, 4])", 2, jump([2, 3, 1, 1, 4])
tc "jump([2, 3, 0, 1, 4])", 2, jump([2, 3, 0, 1, 4])
tc "jump([0])", 0, jump([0])
tc "jump([1])", 0, jump([1])
tc "jump([1, 2, 3])", 2, jump([1, 2, 3])
tc "jump([1, 1, 1, 1])", 3, jump([1, 1, 1, 1])
