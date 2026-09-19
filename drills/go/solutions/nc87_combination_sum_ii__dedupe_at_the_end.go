package main

func combinationSum2(candidates []int, target int) [][]int {
	// Generate every index-distinct combination, then drop the ones whose
	// sorted values were already seen.
	sorted := sortInts(candidates)
	seen := map[string]bool{}
	result := [][]int{}
	var build func(start, remaining int, current []int)
	build = func(start, remaining int, current []int) {
		if remaining == 0 {
			key := show(current)
			if !seen[key] {
				seen[key] = true
				result = append(result, append([]int{}, current...))
			}
			return
		}
		for i := start; i < len(sorted) && sorted[i] <= remaining; i++ {
			build(i+1, remaining-sorted[i], append(current, sorted[i]))
		}
	}
	build(0, target, []int{})
	return result
}
