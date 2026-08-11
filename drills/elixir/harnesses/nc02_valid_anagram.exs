[
  {~s|anagram?("anagram", "nagaram")|, inspect(true), inspect(Solution.anagram?("anagram", "nagaram"))},
  {~s|anagram?("rat", "car")|, inspect(false), inspect(Solution.anagram?("rat", "car"))},
  {~s|anagram?("", "")|, inspect(true), inspect(Solution.anagram?("", ""))},
  {~s|anagram?("a", "ab")|, inspect(false), inspect(Solution.anagram?("a", "ab"))}
]
