[
  {"car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])", inspect(3),
   inspect(Solution.car_fleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]))},
  {"car_fleet(10, [3], [3])", inspect(1), inspect(Solution.car_fleet(10, [3], [3]))},
  {"car_fleet(100, [0, 2, 4], [4, 2, 1])", inspect(1),
   inspect(Solution.car_fleet(100, [0, 2, 4], [4, 2, 1]))},
  {"car_fleet(10, [6, 8], [3, 2])", inspect(2), inspect(Solution.car_fleet(10, [6, 8], [3, 2]))},
  {"car_fleet(10, [], [])", inspect(0), inspect(Solution.car_fleet(10, [], []))},
  {"car_fleet(10, [0, 4, 2], [2, 1, 3])", inspect(1),
   inspect(Solution.car_fleet(10, [0, 4, 2], [2, 1, 3]))}
]
