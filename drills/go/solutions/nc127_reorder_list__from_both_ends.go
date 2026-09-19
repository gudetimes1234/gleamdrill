package main

func reorderList(head *ListNode) {
	// Put the nodes in a slice, then pick from both ends in turn. O(n)
	// extra space, but the pointer surgery is a single loop.
	nodes := []*ListNode{}
	for node := head; node != nil; node = node.Next {
		nodes = append(nodes, node)
	}
	left, right := 0, len(nodes)-1
	for left < right {
		nodes[left].Next = nodes[right]
		left++
		if left == right {
			break
		}
		nodes[right].Next = nodes[left]
		right--
	}
	if len(nodes) > 0 {
		nodes[left].Next = nil
	}
}
