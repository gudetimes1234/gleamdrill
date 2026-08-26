[
  {~S{word_break("leetcode", ["leet", "code"])}, inspect(true), inspect(Solution.word_break("leetcode", ["leet", "code"]))},
  {~S{word_break("applepenapple", ["apple", "pen"])}, inspect(true), inspect(Solution.word_break("applepenapple", ["apple", "pen"]))},
  {~S{word_break("catsandog", ["cats", "dog", "sand", "and", "cat"])}, inspect(false), inspect(Solution.word_break("catsandog", ["cats", "dog", "sand", "and", "cat"]))},
  {~S{word_break("", ["a"])}, inspect(true), inspect(Solution.word_break("", ["a"]))},
  {~S{word_break("a", [])}, inspect(false), inspect(Solution.word_break("a", []))},
  {~S{word_break("aaaaaaa", ["aaa", "aaaa"])}, inspect(true), inspect(Solution.word_break("aaaaaaa", ["aaa", "aaaa"]))}
]
