package main

import "sort"

func merge(intervals [][]int) [][]int {
	// Sweep the number line: +1 at each start, -1 just after each end. A
	// merged interval runs from where the count leaves zero to where it
	// returns. Ends are keyed at end+1 so touching intervals stay joined.
	if len(intervals) == 0 {
		return [][]int{}
	}
	delta := map[int]int{}
	for _, interval := range intervals {
		delta[interval[0]]++
		delta[interval[1]+1]--
	}
	points := make([]int, 0, len(delta))
	for p := range delta {
		points = append(points, p)
	}
	sort.Ints(points)
	result := [][]int{}
	open, start := 0, 0
	for _, p := range points {
		if open == 0 {
			start = p
		}
		open += delta[p]
		if open == 0 {
			result = append(result, []int{start, p - 1})
		}
	}
	return result
}
