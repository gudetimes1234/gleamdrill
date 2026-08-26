[
  {~S{is_interleave("aabcc", "dbbca", "aadbbcbcac")}, inspect(true), inspect(Solution.is_interleave("aabcc", "dbbca", "aadbbcbcac"))},
  {~S{is_interleave("aabcc", "dbbca", "aadbbbaccc")}, inspect(false), inspect(Solution.is_interleave("aabcc", "dbbca", "aadbbbaccc"))},
  {~S{is_interleave("", "", "")}, inspect(true), inspect(Solution.is_interleave("", "", ""))},
  {~S{is_interleave("a", "", "a")}, inspect(true), inspect(Solution.is_interleave("a", "", "a"))},
  {~S{is_interleave("", "b", "b")}, inspect(true), inspect(Solution.is_interleave("", "b", "b"))},
  {~S{is_interleave("abc", "def", "adbecf")}, inspect(true), inspect(Solution.is_interleave("abc", "def", "adbecf"))}
]
