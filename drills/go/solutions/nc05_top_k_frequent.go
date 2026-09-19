package main

import "sort"

func topKFrequent(nums []int, k int) []int {
	counts := map[int]int{}
	for _, n := range nums {
		counts[n]++
	}
	distinct := make([]int, 0, len(counts))
	for n := range counts {
		distinct = append(distinct, n)
	}
	sort.Slice(distinct, func(i, j int) bool { return counts[distinct[i]] > counts[distinct[j]] })
	return distinct[:k]
}
