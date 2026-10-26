need :plus_one

tc "plus_one([1, 2, 3])", [1, 2, 4], plus_one([1, 2, 3])
tc "plus_one([4, 3, 2, 1])", [4, 3, 2, 2], plus_one([4, 3, 2, 1])
tc "plus_one([9])", [1, 0], plus_one([9])
tc "plus_one([9, 9])", [1, 0, 0], plus_one([9, 9])
tc "plus_one([0])", [1], plus_one([0])
tc "plus_one([1, 9, 9])", [2, 0, 0], plus_one([1, 9, 9])
