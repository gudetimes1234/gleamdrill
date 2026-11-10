package main

func countLong(lines []string, limit int) int {
	n := 0
	for _, line := range lines {
		if len(line) > limit {
			n++
		}
	}
	return n
}
