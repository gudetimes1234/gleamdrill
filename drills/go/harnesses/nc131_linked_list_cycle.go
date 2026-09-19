package main

// chain builds a list whose tail points back at index pos (none for -1).
func chain(values []int, pos int) *ListNode {
	head := list(values...)
	if pos < 0 || head == nil {
		return head
	}
	var target, tail *ListNode
	for i, node := 0, head; node != nil; i, node = i+1, node.Next {
		if i == pos {
			target = node
		}
		tail = node
	}
	tail.Next = target
	return head
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("hasCycle([3,2,0,-4], tail -> index 1)", true, hasCycle(chain([]int{3, 2, 0, -4}, 1))),
			tc("hasCycle([1,2], no cycle)", false, hasCycle(chain([]int{1, 2}, -1))),
			tc("hasCycle([1], no cycle)", false, hasCycle(chain([]int{1}, -1))),
			tc("hasCycle([1], tail -> index 0)", true, hasCycle(chain([]int{1}, 0))),
			tc("hasCycle([])", false, hasCycle(chain([]int{}, -1))),
			tc("hasCycle([1,2], tail -> index 0)", true, hasCycle(chain([]int{1, 2}, 0))),
		}
	})
}
