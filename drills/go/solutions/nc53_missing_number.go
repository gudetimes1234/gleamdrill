package main

func missingNumber(nums []int) int {
	// XOR every index and every value: the pairs cancel, the missing one
	// (which appears only as an index) survives.
	result := len(nums)
	for i, n := range nums {
		result ^= i ^ n
	}
	return result
}
