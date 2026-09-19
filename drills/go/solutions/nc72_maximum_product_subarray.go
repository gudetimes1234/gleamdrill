package main

func maxProduct(nums []int) int {
	// A negative flips the largest and smallest products ending here, so
	// carry both: the smallest may become the largest at the next negative.
	best := nums[0]
	largest, smallest := 1, 1
	for _, n := range nums {
		candidates := []int{n, largest * n, smallest * n}
		largest = max(candidates[0], max(candidates[1], candidates[2]))
		smallest = min(candidates[0], min(candidates[1], candidates[2]))
		best = max(best, largest)
	}
	return best
}
