package main

import "strings"

func progressBar(done, total int) string {
	return "[" + strings.Repeat("#", done) + strings.Repeat("-", total-done) + "]"
}
