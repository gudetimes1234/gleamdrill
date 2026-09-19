package main

import "sort"

func checkInclusion(s1 string, s2 string) bool {
	if len(s1) > len(s2) {
		return false
	}
	target := sortedString(s1)
	// Sort every window of len(s1): a permutation sorts to the same string.
	for i := 0; i+len(s1) <= len(s2); i++ {
		if sortedString(s2[i:i+len(s1)]) == target {
			return true
		}
	}
	return false
}

func sortedString(s string) string {
	b := []byte(s)
	sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
	return string(b)
}
