need :min_eating_speed

tc "min_eating_speed([3, 6, 7, 11], 8)", 4, min_eating_speed([3, 6, 7, 11], 8)
tc "min_eating_speed([30, 11, 23, 4, 20], 5)", 30, min_eating_speed([30, 11, 23, 4, 20], 5)
tc "min_eating_speed([30, 11, 23, 4, 20], 6)", 23, min_eating_speed([30, 11, 23, 4, 20], 6)
tc "min_eating_speed([1], 1)", 1, min_eating_speed([1], 1)
tc "min_eating_speed([4, 4, 4, 4], 4)", 4, min_eating_speed([4, 4, 4, 4], 4)
tc "min_eating_speed([1, 1, 1, 10], 4)", 10, min_eating_speed([1, 1, 1, 10], 4)
