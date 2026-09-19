package main

func findMin(nums []int) int {
	smallest := nums[0]
	for _, n := range nums[1:] {
		if n < smallest {
			smallest = n
		}
	}
	return smallest
}
