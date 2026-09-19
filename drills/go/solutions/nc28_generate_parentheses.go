package main

func generateParenthesis(n int) []string {
	result := []string{}
	var build func(current []byte, open, closed int)
	build = func(current []byte, open, closed int) {
		if len(current) == 2*n {
			result = append(result, string(current))
			return
		}
		// An opener is allowed while some remain; a closer only while it
		// would not outnumber the openers so far.
		if open < n {
			build(append(current, '('), open+1, closed)
		}
		if closed < open {
			build(append(current, ')'), open, closed+1)
		}
	}
	build([]byte{}, 0, 0)
	return result
}
