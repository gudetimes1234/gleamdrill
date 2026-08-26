one = Solution.insert(Solution.new(), "apple")
two = Solution.insert(one, "app")

[
  {~S{search("apple") after inserting it}, inspect(true), inspect(Solution.search(one, "apple"))},
  {~S{search("app") -- a prefix, not a word}, inspect(false),
   inspect(Solution.search(one, "app"))},
  {~S{starts_with("app")}, inspect(true), inspect(Solution.starts_with(one, "app"))},
  {~S{search("app") after inserting it too}, inspect(true), inspect(Solution.search(two, "app"))},
  {~S{starts_with("apz")}, inspect(false), inspect(Solution.starts_with(two, "apz"))},
  {~S{search("") on an empty trie}, inspect(false), inspect(Solution.search(Solution.new(), ""))},
  {~S{starts_with("") on an empty trie}, inspect(true),
   inspect(Solution.starts_with(Solution.new(), ""))}
]
