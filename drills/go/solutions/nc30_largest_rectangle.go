package main

func largestRectangleArea(heights []int) int {
	best := 0
	// Indices with increasing heights. When a lower bar arrives, every
	// taller bar on the stack has found its right edge; its left edge is
	// the bar beneath it on the stack.
	stack := []int{}
	for i := 0; i <= len(heights); i++ {
		current := 0
		if i < len(heights) {
			current = heights[i]
		}
		for len(stack) > 0 && heights[stack[len(stack)-1]] >= current {
			height := heights[stack[len(stack)-1]]
			stack = stack[:len(stack)-1]
			width := i
			if len(stack) > 0 {
				width = i - stack[len(stack)-1] - 1
			}
			best = max(best, height*width)
		}
		stack = append(stack, i)
	}
	return best
}
