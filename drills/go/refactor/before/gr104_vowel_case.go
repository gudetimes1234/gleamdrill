package main

func countVowels(s string) int {
	n := 0
	for _, c := range s {
		if c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' {
			n++
		}
	}
	return n
}
