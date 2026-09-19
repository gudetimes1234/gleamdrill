package main

func isMatch(s string, p string) bool {
	// Plain recursion on the same rule, no memo: exponential in the worst
	// case, but the rule itself is the whole idea.
	if p == "" {
		return s == ""
	}
	first := s != "" && (p[0] == '.' || p[0] == s[0])
	if len(p) > 1 && p[1] == '*' {
		return isMatch(s, p[2:]) || first && isMatch(s[1:], p)
	}
	return first && isMatch(s[1:], p[1:])
}
