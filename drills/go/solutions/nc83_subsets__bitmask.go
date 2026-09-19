package main

func subsets(nums []int) [][]int {
	// Each of the 2^n subsets is a bit pattern: bit i set means nums[i] in.
	n := len(nums)
	result := make([][]int, 0, 1<<n)
	for mask := 0; mask < 1<<n; mask++ {
		subset := []int{}
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				subset = append(subset, nums[i])
			}
		}
		result = append(result, subset)
	}
	return result
}
