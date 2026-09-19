package main

func maxSubArray(nums []int) int {
	// A subarray sum is a difference of prefix sums, so the best ending
	// here is the prefix so far minus the smallest prefix before it.
	best := nums[0]
	prefix, lowest := 0, 0
	for _, n := range nums {
		prefix += n
		best = max(best, prefix-lowest)
		lowest = min(lowest, prefix)
	}
	return best
}
