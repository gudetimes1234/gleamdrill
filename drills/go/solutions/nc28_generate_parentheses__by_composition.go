package main

func generateParenthesis(n int) []string {
	// Every balanced string is "(" + inner + ")" + rest, with inner and
	// rest balanced and their pair counts summing to n-1.
	if n == 0 {
		return []string{""}
	}
	result := []string{}
	for inside := 0; inside < n; inside++ {
		for _, inner := range generateParenthesis(inside) {
			for _, rest := range generateParenthesis(n - 1 - inside) {
				result = append(result, "("+inner+")"+rest)
			}
		}
	}
	return result
}
