package main

func missingNumber(nums []int) int {
	n := len(nums)
	expected := n * (n + 1) / 2
	for _, x := range nums {
		expected -= x
	}
	return expected
}
