package main

import (
	"strings"
	"unicode"
)

func isPalindrome(s string) bool {
	cleaned := []rune{}
	for _, c := range strings.ToLower(s) {
		if unicode.IsLetter(c) || unicode.IsDigit(c) {
			cleaned = append(cleaned, c)
		}
	}
	for i, j := 0, len(cleaned)-1; i < j; i, j = i+1, j-1 {
		if cleaned[i] != cleaned[j] {
			return false
		}
	}
	return true
}
