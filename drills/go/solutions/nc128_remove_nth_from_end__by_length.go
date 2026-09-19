package main

func removeNthFromEnd(head *ListNode, n int) *ListNode {
	// Count the nodes, then walk to the one before position length-n.
	length := 0
	for node := head; node != nil; node = node.Next {
		length++
	}
	dummy := &ListNode{Next: head}
	before := dummy
	for i := 0; i < length-n; i++ {
		before = before.Next
	}
	before.Next = before.Next.Next
	return dummy.Next
}
