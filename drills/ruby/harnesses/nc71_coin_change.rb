need :coin_change

tc "coin_change([1, 2, 5], 11)", 3, coin_change([1, 2, 5], 11)
tc "coin_change([2], 3)", -1, coin_change([2], 3)
tc "coin_change([1], 0)", 0, coin_change([1], 0)
tc "coin_change([], 5)", -1, coin_change([], 5)
tc "coin_change([1, 3, 4], 6)", 2, coin_change([1, 3, 4], 6)
tc "coin_change([2, 5, 10, 1], 27)", 4, coin_change([2, 5, 10, 1], 27)
