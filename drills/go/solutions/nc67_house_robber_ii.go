package main

func rob(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}
	// The circle means the first and last house cannot both be robbed, so
	// the answer is the better of the two straight-line problems that
	// leave one of them out.
	return max(robLine(nums[1:]), robLine(nums[:len(nums)-1]))
}

func robLine(nums []int) int {
	twoBack, oneBack := 0, 0
	for _, n := range nums {
		twoBack, oneBack = oneBack, max(oneBack, twoBack+n)
	}
	return oneBack
}
