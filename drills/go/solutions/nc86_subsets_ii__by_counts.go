package main

import "sort"

func subsetsWithDup(nums []int) [][]int {
	// Count each distinct value; a subset is a choice of how many copies of
	// each to take, so duplicates never arise.
	counts := map[int]int{}
	for _, n := range nums {
		counts[n]++
	}
	distinct := make([]int, 0, len(counts))
	for n := range counts {
		distinct = append(distinct, n)
	}
	sort.Ints(distinct)
	result := [][]int{}
	var build func(i int, current []int)
	build = func(i int, current []int) {
		if i == len(distinct) {
			result = append(result, append([]int{}, current...))
			return
		}
		build(i+1, current)
		for copies := 1; copies <= counts[distinct[i]]; copies++ {
			current = append(current, distinct[i])
			build(i+1, current)
		}
	}
	build(0, []int{})
	return result
}
