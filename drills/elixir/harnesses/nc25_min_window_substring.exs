[
  {~S{min_window("ADOBECODEBANC", "ABC")}, inspect("BANC"),
   inspect(Solution.min_window("ADOBECODEBANC", "ABC"))},
  {~S{min_window("a", "a")}, inspect("a"), inspect(Solution.min_window("a", "a"))},
  {~S{min_window("a", "aa")}, inspect(""), inspect(Solution.min_window("a", "aa"))},
  {~S{min_window("", "a")}, inspect(""), inspect(Solution.min_window("", "a"))},
  {~S{min_window("ab", "")}, inspect(""), inspect(Solution.min_window("ab", ""))},
  {~S{min_window("aaflslflsldkalskaaa", "aaa")}, inspect("aaa"),
   inspect(Solution.min_window("aaflslflsldkalskaaa", "aaa"))}
]
