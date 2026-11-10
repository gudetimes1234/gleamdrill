package main

func countLong(lines []string, limit int) int {
	n := 0
	for i := 0; i < len(lines); i++ {
		if len(lines[i]) > limit {
			n++
		}
	}
	return n
}
