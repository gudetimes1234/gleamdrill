package main

import "sort"

func minInterval(intervals [][]int, queries []int) []int {
	// Take the intervals shortest first; the first one to cover a query is
	// its answer, so each query is settled exactly once. Points are found
	// by binary search over the sorted distinct queries.
	sorted := append([][]int{}, intervals...)
	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i][1]-sorted[i][0] < sorted[j][1]-sorted[j][0]
	})
	distinct := sortInts(queries)
	answer := map[int]int{}
	for _, interval := range sorted {
		from := sort.SearchInts(distinct, interval[0])
		for i := from; i < len(distinct) && distinct[i] <= interval[1]; i++ {
			if _, done := answer[distinct[i]]; !done {
				answer[distinct[i]] = interval[1] - interval[0] + 1
			}
		}
	}
	result := make([]int, len(queries))
	for i, q := range queries {
		if size, ok := answer[q]; ok {
			result[i] = size
		} else {
			result[i] = -1
		}
	}
	return result
}
