package main

func rob(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}
	// One pass over the array, carrying two states: the best excluding the
	// first house and the best excluding the last.
	var skipFirst, skipLast [2]int // {twoBack, oneBack}
	for i, n := range nums {
		if i > 0 {
			skipFirst = [2]int{skipFirst[1], max(skipFirst[1], skipFirst[0]+n)}
		}
		if i < len(nums)-1 {
			skipLast = [2]int{skipLast[1], max(skipLast[1], skipLast[0]+n)}
		}
	}
	return max(skipFirst[1], skipLast[1])
}
