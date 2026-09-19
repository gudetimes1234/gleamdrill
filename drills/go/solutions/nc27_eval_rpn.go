package main

import "strconv"

func evalRPN(tokens []string) int {
	stack := []int{}
	for _, token := range tokens {
		if n, err := strconv.Atoi(token); err == nil {
			stack = append(stack, n)
			continue
		}
		b, a := stack[len(stack)-1], stack[len(stack)-2]
		stack = stack[:len(stack)-2]
		switch token {
		case "+":
			stack = append(stack, a+b)
		case "-":
			stack = append(stack, a-b)
		case "*":
			stack = append(stack, a*b)
		case "/":
			stack = append(stack, a/b)
		}
	}
	return stack[0]
}
