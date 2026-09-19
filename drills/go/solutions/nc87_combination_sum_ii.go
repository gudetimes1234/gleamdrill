package main

func combinationSum2(candidates []int, target int) [][]int {
	sorted := sortInts(candidates)
	result := [][]int{}
	var build func(start, remaining int, current []int)
	build = func(start, remaining int, current []int) {
		if remaining == 0 {
			result = append(result, append([]int{}, current...))
			return
		}
		for i := start; i < len(sorted); i++ {
			if sorted[i] > remaining {
				break
			}
			// Each candidate once (i+1), and no repeat value at the same depth.
			if i > start && sorted[i] == sorted[i-1] {
				continue
			}
			build(i+1, remaining-sorted[i], append(current, sorted[i]))
		}
	}
	build(0, target, []int{})
	return result
}
