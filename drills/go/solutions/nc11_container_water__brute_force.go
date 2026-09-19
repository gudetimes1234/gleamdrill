package main

func maxArea(height []int) int {
	best := 0
	for i := 0; i < len(height); i++ {
		for j := i + 1; j < len(height); j++ {
			area := (j - i) * min(height[i], height[j])
			if area > best {
				best = area
			}
		}
	}
	return best
}
