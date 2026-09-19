package main

func reverseList(head *ListNode) *ListNode {
	var previous *ListNode
	// Walk the list, pointing each node back at the one before it.
	for head != nil {
		head.Next, previous, head = previous, head, head.Next
	}
	return previous
}
