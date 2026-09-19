package main

func maxArea(height []int) int {
	left, right, best := 0, len(height)-1, 0
	for left < right {
		area := (right - left) * min(height[left], height[right])
		if area > best {
			best = area
		}
		// Moving the taller line in can never help: the shorter one caps the area.
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}
	return best
}
