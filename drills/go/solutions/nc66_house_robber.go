package main

func rob(nums []int) int {
	// Best haul up to each house: rob it (plus the best two back) or skip
	// it (the best one back).
	twoBack, oneBack := 0, 0
	for _, n := range nums {
		twoBack, oneBack = oneBack, max(oneBack, twoBack+n)
	}
	return oneBack
}
