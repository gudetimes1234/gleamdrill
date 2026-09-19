package main

func reverseKGroup(head *ListNode, k int) *ListNode {
	// Count the nodes first, so the loop knows exactly how many full groups
	// there are and never has to probe ahead.
	length := 0
	for node := head; node != nil; node = node.Next {
		length++
	}
	dummy := &ListNode{Next: head}
	groupBefore := dummy
	for ; length >= k; length -= k {
		first := groupBefore.Next
		var previous *ListNode
		node := first
		for i := 0; i < k; i++ {
			node.Next, previous, node = previous, node, node.Next
		}
		first.Next = node
		groupBefore.Next = previous
		groupBefore = first
	}
	return dummy.Next
}
