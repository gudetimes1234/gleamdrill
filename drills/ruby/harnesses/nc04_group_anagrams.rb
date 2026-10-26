need :group_anagrams

# Groups and their order are free: compare them sorted.
def normalised(groups) = groups.map(&:sort).sort

tc 'group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])',
   [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]],
   normalised(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
tc "group_anagrams([])", [], normalised(group_anagrams([]))
tc 'group_anagrams(["a"])', [["a"]], normalised(group_anagrams(["a"]))
