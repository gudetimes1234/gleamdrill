[
  {~S{num_distinct("rabbbit", "rabbit")}, inspect(3), inspect(Solution.num_distinct("rabbbit", "rabbit"))},
  {~S{num_distinct("babgbag", "bag")}, inspect(5), inspect(Solution.num_distinct("babgbag", "bag"))},
  {~S{num_distinct("", "a")}, inspect(0), inspect(Solution.num_distinct("", "a"))},
  {~S{num_distinct("a", "")}, inspect(1), inspect(Solution.num_distinct("a", ""))},
  {~S{num_distinct("abc", "abc")}, inspect(1), inspect(Solution.num_distinct("abc", "abc"))},
  {~S{num_distinct("aaa", "aa")}, inspect(3), inspect(Solution.num_distinct("aaa", "aa"))}
]
