[
  {~S{is_match("aa", "a")}, inspect(false), inspect(Solution.is_match("aa", "a"))},
  {~S{is_match("aa", "a*")}, inspect(true), inspect(Solution.is_match("aa", "a*"))},
  {~S{is_match("ab", ".*")}, inspect(true), inspect(Solution.is_match("ab", ".*"))},
  {~S{is_match("aab", "c*a*b")}, inspect(true), inspect(Solution.is_match("aab", "c*a*b"))},
  {~S{is_match("mississippi", "mis*is*p*.")}, inspect(false), inspect(Solution.is_match("mississippi", "mis*is*p*."))},
  {~S{is_match("", ".*")}, inspect(true), inspect(Solution.is_match("", ".*"))},
  {~S{is_match("", "")}, inspect(true), inspect(Solution.is_match("", ""))},
  {~S{is_match("abc", "abc")}, inspect(true), inspect(Solution.is_match("abc", "abc"))}
]
