package main

import "strconv"

func evalRPN(tokens []string) int {
	// Read from the end: the last token is an operator whose operands are
	// the two expressions before it, right one first.
	i := len(tokens) - 1
	return evalFrom(tokens, &i)
}

func evalFrom(tokens []string, i *int) int {
	token := tokens[*i]
	*i--
	if n, err := strconv.Atoi(token); err == nil {
		return n
	}
	b := evalFrom(tokens, i)
	a := evalFrom(tokens, i)
	switch token {
	case "+":
		return a + b
	case "-":
		return a - b
	case "*":
		return a * b
	default:
		return a / b
	}
}
