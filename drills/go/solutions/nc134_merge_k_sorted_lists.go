package main

func mergeKLists(lists []*ListNode) *ListNode {
	// Merge in pairs, halving the number of lists each round. Folding them in
	// one at a time re-walks the growing result every time -- O(k*n) -- while
	// pairing gives O(n log k) for the same merges, because each element is
	// copied once per round and there are log k rounds.
	remaining := []*ListNode{}
	for _, head := range lists {
		if head != nil {
			remaining = append(remaining, head)
		}
	}
	if len(remaining) == 0 {
		return nil
	}
	for len(remaining) > 1 {
		merged := []*ListNode{}
		for i := 0; i < len(remaining); i += 2 {
			if i+1 < len(remaining) {
				merged = append(merged, merge(remaining[i], remaining[i+1]))
			} else {
				merged = append(merged, remaining[i])
			}
		}
		remaining = merged
	}
	return remaining[0]
}

func merge(first, second *ListNode) *ListNode {
	dummy := &ListNode{}
	tail := dummy
	for first != nil && second != nil {
		if first.Val <= second.Val {
			tail.Next, first = first, first.Next
		} else {
			tail.Next, second = second, second.Next
		}
		tail = tail.Next
	}
	if first != nil {
		tail.Next = first
	} else {
		tail.Next = second
	}
	return dummy.Next
}
