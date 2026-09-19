package main

func reorderList(head *ListNode) {
	if head == nil || head.Next == nil {
		return
	}
	// Find the middle, reverse the second half, then interleave the two.
	slow, fast := head, head
	for fast.Next != nil && fast.Next.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
	}
	var second *ListNode
	for node := slow.Next; node != nil; {
		node.Next, second, node = second, node, node.Next
	}
	slow.Next = nil
	first := head
	for second != nil {
		first.Next, second.Next, first, second = second, first.Next, first.Next, second.Next
	}
}
