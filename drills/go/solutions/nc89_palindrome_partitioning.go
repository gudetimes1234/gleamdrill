package main

func partition(s string) [][]string {
	result := [][]string{}
	var build func(start int, current []string)
	build = func(start int, current []string) {
		if start == len(s) {
			result = append(result, append([]string{}, current...))
			return
		}
		// Cut off every palindromic prefix of what remains and recurse.
		for end := start + 1; end <= len(s); end++ {
			if isPalindrome(s[start:end]) {
				build(end, append(current, s[start:end]))
			}
		}
	}
	build(0, []string{})
	return result
}

func isPalindrome(s string) bool {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		if s[i] != s[j] {
			return false
		}
	}
	return true
}
