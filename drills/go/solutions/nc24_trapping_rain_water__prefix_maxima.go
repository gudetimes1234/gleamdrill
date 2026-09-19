package main

func trap(height []int) int {
	n := len(height)
	if n == 0 {
		return 0
	}
	// Water above a bar is bounded by the tallest bar to each side.
	leftMax := make([]int, n)
	rightMax := make([]int, n)
	leftMax[0] = height[0]
	for i := 1; i < n; i++ {
		leftMax[i] = max(leftMax[i-1], height[i])
	}
	rightMax[n-1] = height[n-1]
	for i := n - 2; i >= 0; i-- {
		rightMax[i] = max(rightMax[i+1], height[i])
	}
	water := 0
	for i, h := range height {
		water += min(leftMax[i], rightMax[i]) - h
	}
	return water
}
