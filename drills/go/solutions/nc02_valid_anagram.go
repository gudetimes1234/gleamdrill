package main

func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}
	counts := map[rune]int{}
	for _, c := range s {
		counts[c]++
	}
	for _, c := range t {
		if counts[c] == 0 {
			return false
		}
		counts[c]--
	}
	return true
}
