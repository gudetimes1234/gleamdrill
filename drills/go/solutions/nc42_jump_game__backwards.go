package main

func canJump(nums []int) bool {
	// Walk back from the end, moving the goal to any index that can reach it.
	goal := len(nums) - 1
	for i := len(nums) - 2; i >= 0; i-- {
		if i+nums[i] >= goal {
			goal = i
		}
	}
	return goal == 0
}
