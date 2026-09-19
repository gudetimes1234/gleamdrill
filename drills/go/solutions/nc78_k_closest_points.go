package main

import "container/heap"

type farthestFirst [][]int

func (h farthestFirst) Len() int { return len(h) }
func (h farthestFirst) Less(i, j int) bool {
	return h[i][0]*h[i][0]+h[i][1]*h[i][1] > h[j][0]*h[j][0]+h[j][1]*h[j][1]
}
func (h farthestFirst) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *farthestFirst) Push(x any)   { *h = append(*h, x.([]int)) }
func (h *farthestFirst) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

func kClosest(points [][]int, k int) [][]int {
	// A max-heap (by distance) of size k: pushing a point and popping the
	// farthest keeps exactly the k nearest, in O(n log k).
	h := &farthestFirst{}
	for _, p := range points {
		heap.Push(h, p)
		if h.Len() > k {
			heap.Pop(h)
		}
	}
	return append([][]int{}, *h...)
}
