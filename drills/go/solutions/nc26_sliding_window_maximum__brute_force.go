package main

func maxSlidingWindow(nums []int, k int) []int {
	result := make([]int, 0, len(nums)-k+1)
	for i := 0; i+k <= len(nums); i++ {
		best := nums[i]
		for _, n := range nums[i+1 : i+k] {
			best = max(best, n)
		}
		result = append(result, best)
	}
	return result
}
