package main

import "container/heap"

type minHeap []int

func (h minHeap) Len() int           { return len(h) }
func (h minHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *minHeap) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

type maxHeap struct{ minHeap }

func (h maxHeap) Less(i, j int) bool { return h.minHeap[i] > h.minHeap[j] }

// The lower half in a max-heap, the upper half in a min-heap, the lower
// allowed one extra: the median is the lower's top, or the mean of both tops.
type MedianFinder struct {
	lower *maxHeap
	upper *minHeap
}

func Constructor() MedianFinder {
	return MedianFinder{lower: &maxHeap{}, upper: &minHeap{}}
}

func (m *MedianFinder) AddNum(num int) {
	heap.Push(m.lower, num)
	// Rebalance: the lower's largest belongs above if it beats the upper's smallest.
	heap.Push(m.upper, heap.Pop(m.lower))
	if m.upper.Len() > m.lower.Len() {
		heap.Push(m.lower, heap.Pop(m.upper))
	}
}

func (m *MedianFinder) FindMedian() float64 {
	if m.lower.Len() == 0 {
		return 0
	}
	if m.lower.Len() > m.upper.Len() {
		return float64(m.lower.minHeap[0])
	}
	return float64(m.lower.minHeap[0]+(*m.upper)[0]) / 2
}
