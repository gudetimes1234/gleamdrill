package main

func insertAt(queue []string, i int, name string) []string {
	return append(queue[:i], append([]string{name}, queue[i:]...)...)
}
