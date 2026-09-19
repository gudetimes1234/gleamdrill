package main

import "sort"

// Keep every value sorted; the kth largest is k from the end. Each add is
// a binary search plus an insertion shift, O(n) rather than O(log k).
type KthLargest struct {
	k      int
	sorted []int
}

func Constructor(k int, nums []int) KthLargest {
	store := KthLargest{k: k, sorted: []int{}}
	for _, n := range nums {
		store.Add(n)
	}
	return store
}

func (s *KthLargest) Add(val int) int {
	i := sort.SearchInts(s.sorted, val)
	s.sorted = append(s.sorted, 0)
	copy(s.sorted[i+1:], s.sorted[i:])
	s.sorted[i] = val
	if len(s.sorted) < s.k {
		return -1
	}
	return s.sorted[len(s.sorted)-s.k]
}
