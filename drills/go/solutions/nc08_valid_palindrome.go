package main

import "unicode"

func isPalindrome(s string) bool {
	runes := []rune(s)
	left, right := 0, len(runes)-1
	for left < right {
		// Skip the punctuation in place: no cleaned copy is ever built.
		if !isAlphanumeric(runes[left]) {
			left++
			continue
		}
		if !isAlphanumeric(runes[right]) {
			right--
			continue
		}
		if unicode.ToLower(runes[left]) != unicode.ToLower(runes[right]) {
			return false
		}
		left++
		right--
	}
	return true
}

func isAlphanumeric(c rune) bool {
	return unicode.IsLetter(c) || unicode.IsDigit(c)
}
