package main

func checkValidString(s string) bool {
	// Left to right, stars count as openers: no closer may go unmatched.
	// Right to left, stars count as closers: no opener may go unmatched.
	// Both passing means some assignment of the stars balances the string.
	balance := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ')' {
			balance--
		} else {
			balance++
		}
		if balance < 0 {
			return false
		}
	}
	balance = 0
	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == '(' {
			balance--
		} else {
			balance++
		}
		if balance < 0 {
			return false
		}
	}
	return true
}
