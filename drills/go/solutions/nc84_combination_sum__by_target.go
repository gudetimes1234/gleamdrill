package main

func combinationSum(candidates []int, target int) [][]int {
	// ways[t] is every combination summing to t, built up one candidate
	// at a time so each combination is generated in one order only.
	ways := make([][][]int, target+1)
	ways[0] = [][]int{{}}
	for _, c := range candidates {
		for t := c; t <= target; t++ {
			for _, combo := range ways[t-c] {
				ways[t] = append(ways[t], append(append([]int{}, combo...), c))
			}
		}
	}
	if ways[target] == nil {
		return [][]int{}
	}
	return ways[target]
}
