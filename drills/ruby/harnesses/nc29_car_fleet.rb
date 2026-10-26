need :car_fleet

tc "car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", 3, car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])
tc "car_fleet(10, [3], [3])", 1, car_fleet(10, [3], [3])
tc "car_fleet(100, [0, 2, 4], [4, 2, 1])", 1, car_fleet(100, [0, 2, 4], [4, 2, 1])
tc "car_fleet(10, [6, 8], [3, 2])", 2, car_fleet(10, [6, 8], [3, 2])
tc "car_fleet(10, [], [])", 0, car_fleet(10, [], [])
tc "car_fleet(10, [0, 4, 2], [2, 1, 3])", 1, car_fleet(10, [0, 4, 2], [2, 1, 3])
