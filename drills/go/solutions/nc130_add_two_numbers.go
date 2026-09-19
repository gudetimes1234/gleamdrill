package main

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	// Digits are least significant first, so add column by column with a
	// carry, like on paper, and keep going while anything remains.
	dummy := &ListNode{}
	tail := dummy
	carry := 0
	for l1 != nil || l2 != nil || carry > 0 {
		total := carry
		if l1 != nil {
			total += l1.Val
			l1 = l1.Next
		}
		if l2 != nil {
			total += l2.Val
			l2 = l2.Next
		}
		tail.Next = &ListNode{Val: total % 10}
		tail = tail.Next
		carry = total / 10
	}
	return dummy.Next
}
