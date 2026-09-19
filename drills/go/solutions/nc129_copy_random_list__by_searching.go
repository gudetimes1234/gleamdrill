package main

func copyRandomList(head *RandomNode) *RandomNode {
	// Copy the chain first, then for each node find where its Random
	// points by walking both lists in step. O(n^2), no map.
	if head == nil {
		return nil
	}
	dummy := &RandomNode{}
	tail := dummy
	for node := head; node != nil; node = node.Next {
		tail.Next = &RandomNode{Val: node.Val}
		tail = tail.Next
	}
	for original, copied := head, dummy.Next; original != nil; original, copied = original.Next, copied.Next {
		if original.Random == nil {
			continue
		}
		for a, b := head, dummy.Next; a != nil; a, b = a.Next, b.Next {
			if a == original.Random {
				copied.Random = b
				break
			}
		}
	}
	return dummy.Next
}
