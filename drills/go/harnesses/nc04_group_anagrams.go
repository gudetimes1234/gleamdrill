package main

// Groups may come back in any order, and so may their members.
func main() {
	run(func() []testCase {
		return []testCase{
			tc("groupAnagrams(['eat','tea','tan','ate','nat','bat'])",
				[][]string{{"ate", "eat", "tea"}, {"bat"}, {"nat", "tan"}},
				sortGroups(groupAnagrams([]string{"eat", "tea", "tan", "ate", "nat", "bat"}))),
			tc("groupAnagrams([])", [][]string{}, sortGroups(groupAnagrams([]string{}))),
			tc("groupAnagrams(['a'])", [][]string{{"a"}}, sortGroups(groupAnagrams([]string{"a"}))),
		}
	})
}
