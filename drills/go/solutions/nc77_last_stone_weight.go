package main

import "container/heap"

type maxHeap []int

func (h maxHeap) Len() int           { return len(h) }
func (h maxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h maxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *maxHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *maxHeap) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

func lastStoneWeight(stones []int) int {
	h := &maxHeap{}
	for _, s := range stones {
		heap.Push(h, s)
	}
	// Smash the two heaviest; the difference, if any, goes back in.
	for h.Len() > 1 {
		first := heap.Pop(h).(int)
		second := heap.Pop(h).(int)
		if first != second {
			heap.Push(h, first-second)
		}
	}
	if h.Len() == 0 {
		return 0
	}
	return (*h)[0]
}
