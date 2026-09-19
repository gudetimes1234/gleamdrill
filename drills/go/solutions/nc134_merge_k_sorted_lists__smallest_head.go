package main

func mergeKLists(lists []*ListNode) *ListNode {
	// Scan the k heads for the smallest each step, no heap: O(Nk).
	heads := append([]*ListNode{}, lists...)
	dummy := &ListNode{}
	tail := dummy
	for {
		smallest := -1
		for i, node := range heads {
			if node != nil && (smallest < 0 || node.Val < heads[smallest].Val) {
				smallest = i
			}
		}
		if smallest < 0 {
			return dummy.Next
		}
		tail.Next = heads[smallest]
		tail = tail.Next
		heads[smallest] = heads[smallest].Next
	}
}
