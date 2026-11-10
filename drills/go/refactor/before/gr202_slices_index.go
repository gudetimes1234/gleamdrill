package main

func position(names []string, target string) int {
	for i, name := range names {
		if name == target {
			return i
		}
	}
	return -1
}
