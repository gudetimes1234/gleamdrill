need :change

tc "change(5, [1, 2, 5])", 4, change(5, [1, 2, 5])
tc "change(3, [2])", 0, change(3, [2])
tc "change(10, [10])", 1, change(10, [10])
tc "change(0, [1])", 1, change(0, [1])
tc "change(5, [])", 0, change(5, [])
tc "change(11, [1, 2, 5])", 11, change(11, [1, 2, 5])
