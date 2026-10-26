need :last_stone_weight

tc "last_stone_weight([2, 7, 4, 1, 8, 1])", 1, last_stone_weight([2, 7, 4, 1, 8, 1])
tc "last_stone_weight([1])", 1, last_stone_weight([1])
tc "last_stone_weight([])", 0, last_stone_weight([])
tc "last_stone_weight([2, 2])", 0, last_stone_weight([2, 2])
tc "last_stone_weight([3, 7, 2])", 2, last_stone_weight([3, 7, 2])
tc "last_stone_weight([10, 4, 2, 10])", 2, last_stone_weight([10, 4, 2, 10])
