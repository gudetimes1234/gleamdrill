package main

import "math/big"

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	// Read both lists as numbers, add, write the digits back. Big ints so
	// long lists do not overflow.
	sum := new(big.Int).Add(toNumber(l1), toNumber(l2))
	text := sum.String()
	var head *ListNode
	for i := 0; i < len(text); i++ {
		head = &ListNode{Val: int(text[i] - '0'), Next: head}
	}
	return head
}

func toNumber(node *ListNode) *big.Int {
	digits := []int{}
	for ; node != nil; node = node.Next {
		digits = append(digits, node.Val)
	}
	n := new(big.Int)
	for i := len(digits) - 1; i >= 0; i-- {
		n.Mul(n, big.NewInt(10))
		n.Add(n, big.NewInt(int64(digits[i])))
	}
	return n
}
