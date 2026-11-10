package main

func squares(nums []int) []int {
	var out []int
	for _, n := range nums {
		out = append(out, n*n)
	}
	return out
}
