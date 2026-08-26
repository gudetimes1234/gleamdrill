[
  {~S{change(5, [1, 2, 5])}, inspect(4), inspect(Solution.change(5, [1, 2, 5]))},
  {~S{change(3, [2])}, inspect(0), inspect(Solution.change(3, [2]))},
  {~S{change(10, [10])}, inspect(1), inspect(Solution.change(10, [10]))},
  {~S{change(0, [1])}, inspect(1), inspect(Solution.change(0, [1]))},
  {~S{change(5, [])}, inspect(0), inspect(Solution.change(5, []))},
  {~S{change(11, [1, 2, 5])}, inspect(11), inspect(Solution.change(11, [1, 2, 5]))}
]
