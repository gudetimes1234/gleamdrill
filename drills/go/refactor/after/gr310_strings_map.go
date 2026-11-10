package main

import "strings"

func maskDigits(s string) string {
	return strings.Map(func(r rune) rune {
		if r >= '0' && r <= '9' {
			return '*'
		}
		return r
	}, s)
}
