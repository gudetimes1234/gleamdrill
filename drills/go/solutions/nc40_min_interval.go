package main

import (
	"container/heap"
	"sort"
)

type sizeHeap [][2]int // {size, end}

func (h sizeHeap) Len() int           { return len(h) }
func (h sizeHeap) Less(i, j int) bool { return h[i][0] < h[j][0] }
func (h sizeHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *sizeHeap) Push(x any)        { *h = append(*h, x.([2]int)) }
func (h *sizeHeap) Pop() any          { old := *h; x := old[len(old)-1]; *h = old[:len(old)-1]; return x }

func minInterval(intervals [][]int, queries []int) []int {
	// Answer the queries in increasing order: intervals become eligible by
	// start, sit in a heap by size, and are discarded from the top once
	// their end is behind the current query.
	sorted := append([][]int{}, intervals...)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i][0] < sorted[j][0] })
	order := make([]int, len(queries))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(i, j int) bool { return queries[order[i]] < queries[order[j]] })

	result := make([]int, len(queries))
	h := &sizeHeap{}
	next := 0
	for _, qi := range order {
		q := queries[qi]
		for next < len(sorted) && sorted[next][0] <= q {
			heap.Push(h, [2]int{sorted[next][1] - sorted[next][0] + 1, sorted[next][1]})
			next++
		}
		for h.Len() > 0 && (*h)[0][1] < q {
			heap.Pop(h)
		}
		if h.Len() == 0 {
			result[qi] = -1
		} else {
			result[qi] = (*h)[0][0]
		}
	}
	return result
}
