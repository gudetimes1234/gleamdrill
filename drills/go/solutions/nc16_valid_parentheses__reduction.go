package main

import "strings"

func isValid(s string) bool {
	// Delete innermost pairs until nothing changes; only the empty string
	// survives if the brackets were balanced. Quadratic, but obviously right.
	for {
		next := strings.NewReplacer("()", "", "[]", "", "{}", "").Replace(s)
		if next == s {
			return s == ""
		}
		s = next
	}
}
