package main

func dailyTemperatures(temperatures []int) []int {
	answer := make([]int, len(temperatures))
	// Indices of days still waiting for a warmer one, temperatures decreasing.
	stack := []int{}
	for i, t := range temperatures {
		for len(stack) > 0 && temperatures[stack[len(stack)-1]] < t {
			j := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			answer[j] = i - j
		}
		stack = append(stack, i)
	}
	return answer
}
