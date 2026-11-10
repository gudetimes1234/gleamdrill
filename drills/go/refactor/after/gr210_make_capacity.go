package main

func squares(nums []int) []int {
	out := make([]int, 0, len(nums))
	for _, n := range nums {
		out = append(out, n*n)
	}
	return out
}
