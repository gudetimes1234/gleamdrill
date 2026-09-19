package main

func largestRectangleArea(heights []int) int {
	best := 0
	// Each bar is the shortest of some best rectangle: widen from it in
	// both directions while the neighbours are at least as tall.
	for i, h := range heights {
		left := i
		for left > 0 && heights[left-1] >= h {
			left--
		}
		right := i
		for right < len(heights)-1 && heights[right+1] >= h {
			right++
		}
		best = max(best, h*(right-left+1))
	}
	return best
}
