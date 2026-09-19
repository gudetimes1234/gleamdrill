package main

func lengthOfLIS(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	// longest[i]: length of the longest increasing subsequence ending at i,
	// one more than the best among smaller earlier elements.
	longest := make([]int, len(nums))
	best := 1
	for i := range nums {
		longest[i] = 1
		for j := 0; j < i; j++ {
			if nums[j] < nums[i] {
				longest[i] = max(longest[i], longest[j]+1)
			}
		}
		best = max(best, longest[i])
	}
	return best
}
