# Any order is acceptable, so every case compares sorted.
sorted = fn n -> Enum.sort(Solution.generate_parenthesis(n)) end

[
  {"generate_parenthesis(1)", inspect(["()"]), inspect(sorted.(1))},
  {"generate_parenthesis(2)", inspect(["(())", "()()"]), inspect(sorted.(2))},
  {"generate_parenthesis(3)",
   inspect(["((()))", "(()())", "(())()", "()(())", "()()()"]), inspect(sorted.(3))},
  {"generate_parenthesis(4) count", inspect(14), inspect(length(sorted.(4)))}
]
