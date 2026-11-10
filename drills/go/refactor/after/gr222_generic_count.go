package main

func count[T comparable](xs []T, want T) int {
	n := 0
	for _, x := range xs {
		if x == want {
			n++
		}
	}
	return n
}

func tally(rolls []int, tags []string) []int {
	return []int{count(rolls, 6), count(tags, "urgent")}
}
