package main

func canJump(nums []int) bool {
	furthest := 0
	for i, n := range nums {
		if i > furthest {
			return false
		}
		furthest = max(furthest, i+n)
	}
	return true
}
