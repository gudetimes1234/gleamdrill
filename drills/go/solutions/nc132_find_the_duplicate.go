package main

func findDuplicate(nums []int) int {
	// Treat i -> nums[i] as a linked list: values in 1..n over indices
	// 0..n means a duplicate is a node with two incoming links, the start
	// of a cycle. Floyd's algorithm finds it with no extra memory.
	slow, fast := nums[0], nums[nums[0]]
	for slow != fast {
		slow, fast = nums[slow], nums[nums[fast]]
	}
	slow = 0
	for slow != fast {
		slow, fast = nums[slow], nums[fast]
	}
	return slow
}
