package main

func hasCycle(head *ListNode) bool {
	// Tortoise and hare: in a cycle the fast pointer laps the slow one.
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow, fast = slow.Next, fast.Next.Next
		if slow == fast {
			return true
		}
	}
	return false
}
