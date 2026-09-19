package main

func permute(nums []int) [][]int {
	result := [][]int{}
	used := make([]bool, len(nums))
	var build func(current []int)
	build = func(current []int) {
		if len(current) == len(nums) {
			result = append(result, append([]int{}, current...))
			return
		}
		for i, n := range nums {
			if used[i] {
				continue
			}
			used[i] = true
			build(append(current, n))
			used[i] = false
		}
	}
	build([]int{})
	return result
}
