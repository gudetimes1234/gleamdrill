package main

func findDuplicate(nums []int) int {
	seen := map[int]bool{}
	for _, n := range nums {
		if seen[n] {
			return n
		}
		seen[n] = true
	}
	return -1
}
