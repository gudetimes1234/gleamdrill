package main

func maxSubArray(nums []int) int {
	best, current := nums[0], nums[0]
	for _, n := range nums[1:] {
		// Extend the run, unless it has gone negative: then start over here.
		current = max(n, current+n)
		best = max(best, current)
	}
	return best
}
