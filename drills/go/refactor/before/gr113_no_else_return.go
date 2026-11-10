package main

import "strconv"

func plural(n int, word string) string {
	if n == 1 {
		return "1 " + word
	} else {
		return strconv.Itoa(n) + " " + word + "s"
	}
}
