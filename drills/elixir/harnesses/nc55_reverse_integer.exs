[
  {"reverse(123)", inspect(321), inspect(Solution.reverse(123))},
  {"reverse(-123)", inspect(-321), inspect(Solution.reverse(-123))},
  {"reverse(120)", inspect(21), inspect(Solution.reverse(120))},
  {"reverse(0)", inspect(0), inspect(Solution.reverse(0))},
  {"reverse(1534236469)", inspect(0), inspect(Solution.reverse(1_534_236_469))},
  {"reverse(-2147483648)", inspect(0), inspect(Solution.reverse(-2_147_483_648))},
  {"reverse(1463847412)", inspect(2_147_483_641), inspect(Solution.reverse(1_463_847_412))}
]
