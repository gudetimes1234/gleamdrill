package main

func trap(height []int) int {
	left, right := 0, len(height)-1
	leftMax, rightMax, water := 0, 0, 0
	// The lower side is bounded by its own maximum: the other side is at
	// least as high, so that water level is certain.
	for left < right {
		if height[left] < height[right] {
			leftMax = max(leftMax, height[left])
			water += leftMax - height[left]
			left++
		} else {
			rightMax = max(rightMax, height[right])
			water += rightMax - height[right]
			right--
		}
	}
	return water
}
