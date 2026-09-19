package main

func jump(nums []int) int {
	// From the goal, jump back to the leftmost index that reaches it; each
	// such hop is one jump of the forward path.
	jumps, goal := 0, len(nums)-1
	for goal > 0 {
		for i := 0; i < goal; i++ {
			if i+nums[i] >= goal {
				goal = i
				jumps++
				break
			}
		}
	}
	return jumps
}
