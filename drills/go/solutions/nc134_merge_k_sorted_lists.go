package main

import "container/heap"

type headHeap []*ListNode

func (h headHeap) Len() int           { return len(h) }
func (h headHeap) Less(i, j int) bool { return h[i].Val < h[j].Val }
func (h headHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *headHeap) Push(x any)        { *h = append(*h, x.(*ListNode)) }
func (h *headHeap) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

func mergeKLists(lists []*ListNode) *ListNode {
	// A min-heap of the current heads: pop the smallest, push its
	// successor. O(N log k) for N nodes across k lists.
	h := &headHeap{}
	for _, node := range lists {
		if node != nil {
			heap.Push(h, node)
		}
	}
	dummy := &ListNode{}
	tail := dummy
	for h.Len() > 0 {
		node := heap.Pop(h).(*ListNode)
		tail.Next = node
		tail = node
		if node.Next != nil {
			heap.Push(h, node.Next)
		}
	}
	return dummy.Next
}
