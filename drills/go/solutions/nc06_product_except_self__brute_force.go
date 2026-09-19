package main

func productExceptSelf(nums []int) []int {
	result := make([]int, len(nums))
	for i := range nums {
		product := 1
		for j, n := range nums {
			if j != i {
				product *= n
			}
		}
		result[i] = product
	}
	return result
}
