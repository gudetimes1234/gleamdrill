package main

import "sort"

// Keep every number in a sorted slice: an insertion is a binary search
// plus a shift, and the median is read off the middle.
type MedianFinder struct {
	sorted []int
}

func Constructor() MedianFinder {
	return MedianFinder{sorted: []int{}}
}

func (m *MedianFinder) AddNum(num int) {
	i := sort.SearchInts(m.sorted, num)
	m.sorted = append(m.sorted, 0)
	copy(m.sorted[i+1:], m.sorted[i:])
	m.sorted[i] = num
}

func (m *MedianFinder) FindMedian() float64 {
	n := len(m.sorted)
	if n == 0 {
		return 0
	}
	if n%2 == 1 {
		return float64(m.sorted[n/2])
	}
	return float64(m.sorted[n/2-1]+m.sorted[n/2]) / 2
}
