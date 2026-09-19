package main

func reverseKGroup(head *ListNode, k int) *ListNode {
	dummy := &ListNode{Next: head}
	groupBefore := dummy
	for {
		// Is there a full group ahead? If not, the tail stays as it is.
		kth := groupBefore
		for i := 0; i < k && kth != nil; i++ {
			kth = kth.Next
		}
		if kth == nil {
			return dummy.Next
		}
		groupAfter := kth.Next
		// Reverse the group in place; its old first node becomes its last.
		previous, node := groupAfter, groupBefore.Next
		for node != groupAfter {
			node.Next, previous, node = previous, node, node.Next
		}
		first := groupBefore.Next
		groupBefore.Next = kth
		groupBefore = first
	}
}
