package main

func subsetsWithDup(nums []int) [][]int {
	sorted := sortInts(nums)
	result := [][]int{}
	var build func(start int, current []int)
	build = func(start int, current []int) {
		result = append(result, append([]int{}, current...))
		for i := start; i < len(sorted); i++ {
			// Sorted, so equal values are adjacent: skipping a repeat at the
			// same depth avoids building the same subset twice.
			if i > start && sorted[i] == sorted[i-1] {
				continue
			}
			build(i+1, append(current, sorted[i]))
		}
	}
	build(0, []int{})
	return result
}
