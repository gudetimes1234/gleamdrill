package main

import "sort"

func groupAnagrams(strs []string) [][]string {
	groups := map[string][]string{}
	order := []string{}
	for _, s := range strs {
		runes := []rune(s)
		sort.Slice(runes, func(i, j int) bool { return runes[i] < runes[j] })
		key := string(runes)
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
