[
  {~S{min_distance("horse", "ros")}, inspect(3), inspect(Solution.min_distance("horse", "ros"))},
  {~S{min_distance("intention", "execution")}, inspect(5), inspect(Solution.min_distance("intention", "execution"))},
  {~S{min_distance("", "abc")}, inspect(3), inspect(Solution.min_distance("", "abc"))},
  {~S{min_distance("abc", "")}, inspect(3), inspect(Solution.min_distance("abc", ""))},
  {~S{min_distance("abc", "abc")}, inspect(0), inspect(Solution.min_distance("abc", "abc"))},
  {~S{min_distance("kitten", "sitting")}, inspect(3), inspect(Solution.min_distance("kitten", "sitting"))}
]
