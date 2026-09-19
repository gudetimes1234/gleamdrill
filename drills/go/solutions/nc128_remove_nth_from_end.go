package main

func removeNthFromEnd(head *ListNode, n int) *ListNode {
	// Two pointers n apart: when the front one runs off the end, the back
	// one is just before the node to drop. The dummy handles dropping the head.
	dummy := &ListNode{Next: head}
	front, back := dummy, dummy
	for i := 0; i <= n; i++ {
		front = front.Next
	}
	for front != nil {
		front, back = front.Next, back.Next
	}
	back.Next = back.Next.Next
	return dummy.Next
}
