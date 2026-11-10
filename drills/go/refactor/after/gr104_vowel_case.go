package main

func countVowels(s string) int {
	n := 0
	for _, c := range s {
		switch c {
		case 'a', 'e', 'i', 'o', 'u':
			n++
		}
	}
	return n
}
