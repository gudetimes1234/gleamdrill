package main

func countInts(xs []int, want int) int {
	n := 0
	for _, x := range xs {
		if x == want {
			n++
		}
	}
	return n
}

func countStrings(xs []string, want string) int {
	n := 0
	for _, x := range xs {
		if x == want {
			n++
		}
	}
	return n
}

func tally(rolls []int, tags []string) []int {
	return []int{countInts(rolls, 6), countStrings(tags, "urgent")}
}
