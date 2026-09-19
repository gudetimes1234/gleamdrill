package main

func reverseList(head *ListNode) *ListNode {
	// Recursive: reverse the rest, then hang the head off what was its
	// successor. The rest's new head is the answer all the way up.
	if head == nil || head.Next == nil {
		return head
	}
	reversed := reverseList(head.Next)
	head.Next.Next = head
	head.Next = nil
	return reversed
}
