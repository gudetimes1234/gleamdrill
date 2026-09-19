package main

import "container/heap"

type intHeap []int

func (h intHeap) Len() int           { return len(h) }
func (h intHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h intHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *intHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *intHeap) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

// A min-heap of the k largest seen so far: its smallest is the kth largest.
type KthLargest struct {
	k    int
	heap *intHeap
}

func Constructor(k int, nums []int) KthLargest {
	store := KthLargest{k: k, heap: &intHeap{}}
	for _, n := range nums {
		store.Add(n)
	}
	return store
}

func (s *KthLargest) Add(val int) int {
	heap.Push(s.heap, val)
	if s.heap.Len() > s.k {
		heap.Pop(s.heap)
	}
	return (*s.heap)[0]
}
