package main

func combinationSum(candidates []int, target int) [][]int {
	result := [][]int{}
	var build func(start, remaining int, current []int)
	build = func(start, remaining int, current []int) {
		if remaining == 0 {
			result = append(result, append([]int{}, current...))
			return
		}
		// Candidates may repeat, so the recursion restarts at i, not i+1;
		// never going back before start keeps each combination unique.
		for i := start; i < len(candidates); i++ {
			if candidates[i] <= remaining {
				build(i, remaining-candidates[i], append(current, candidates[i]))
			}
		}
	}
	build(0, target, []int{})
	return result
}
