package main

func hasCycle(head *ListNode) bool {
	seen := map[*ListNode]bool{}
	for node := head; node != nil; node = node.Next {
		if seen[node] {
			return true
		}
		seen[node] = true
	}
	return false
}
