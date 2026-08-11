normalise = fn groups ->
  groups |> Enum.map(&Enum.sort/1) |> Enum.sort()
end

[
  {~s|group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])|,
   inspect([["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]),
   inspect(normalise.(Solution.group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])))},
  {"group_anagrams([])", inspect([]), inspect(normalise.(Solution.group_anagrams([])))},
  {~s|group_anagrams(["a"])|, inspect([["a"]]), inspect(normalise.(Solution.group_anagrams(["a"])))}
]
