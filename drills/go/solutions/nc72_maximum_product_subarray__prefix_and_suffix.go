package main

func maxProduct(nums []int) int {
	// The best subarray is a prefix or a suffix of some zero-free stretch:
	// take running products from both ends, restarting after a zero.
	best := nums[0]
	prefix, suffix := 1, 1
	n := len(nums)
	for i := 0; i < n; i++ {
		if prefix == 0 {
			prefix = 1
		}
		if suffix == 0 {
			suffix = 1
		}
		prefix *= nums[i]
		suffix *= nums[n-1-i]
		best = max(best, max(prefix, suffix))
	}
	return best
}
