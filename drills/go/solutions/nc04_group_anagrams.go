package main

func groupAnagrams(strs []string) [][]string {
	groups := map[[26]int][]string{}
	order := [][26]int{}
	for _, s := range strs {
		// A 26-slot tally is an anagram-invariant key that costs O(len)
		// rather than O(len log len) to build, and an array is a valid map key.
		var key [26]int
		for i := 0; i < len(s); i++ {
			key[s[i]-'a']++
		}
		if _, seen := groups[key]; !seen {
			order = append(order, key)
		}
		groups[key] = append(groups[key], s)
	}
	result := make([][]string, 0, len(order))
	for _, key := range order {
		result = append(result, groups[key])
	}
	return result
}
