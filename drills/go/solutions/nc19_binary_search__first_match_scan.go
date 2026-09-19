package main

func search(nums []int, target int) int {
	for i, n := range nums {
		if n == target {
			return i
		}
		if n > target {
			break
		}
	}
	return -1
}
