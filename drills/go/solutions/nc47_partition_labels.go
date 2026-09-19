package main

func partitionLabels(s string) []int {
	last := map[byte]int{}
	for i := 0; i < len(s); i++ {
		last[s[i]] = i
	}
	// A part must run at least to the last occurrence of every letter in
	// it; when the walk reaches that furthest point, the part closes.
	sizes := []int{}
	start, end := 0, 0
	for i := 0; i < len(s); i++ {
		end = max(end, last[s[i]])
		if i == end {
			sizes = append(sizes, end-start+1)
			start = i + 1
		}
	}
	return sizes
}
