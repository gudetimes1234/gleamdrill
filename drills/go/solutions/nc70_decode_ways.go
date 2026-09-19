package main

func numDecodings(s string) int {
	if len(s) == 0 || s[0] == '0' {
		return 0
	}
	// Ways to decode the prefix ending here: the last digit alone (if not
	// zero) plus the last two digits together (if 10..26).
	twoBack, oneBack := 1, 1
	for i := 1; i < len(s); i++ {
		current := 0
		if s[i] != '0' {
			current += oneBack
		}
		pair := int(s[i-1]-'0')*10 + int(s[i]-'0')
		if pair >= 10 && pair <= 26 {
			current += twoBack
		}
		twoBack, oneBack = oneBack, current
	}
	return oneBack
}
