package main

import "sort"

func isAnagram(s string, t string) bool {
	return sortedRunes(s) == sortedRunes(t)
}

func sortedRunes(s string) string {
	runes := []rune(s)
	sort.Slice(runes, func(i, j int) bool { return runes[i] < runes[j] })
	return string(runes)
}
