package main

func subsets(nums []int) [][]int {
	result := [][]int{}
	var build func(start int, current []int)
	build = func(start int, current []int) {
		// Every partial choice is itself a subset; record it, then try
		// adding each later element.
		result = append(result, append([]int{}, current...))
		for i := start; i < len(nums); i++ {
			build(i+1, append(current, nums[i]))
		}
	}
	build(0, []int{})
	return result
}
