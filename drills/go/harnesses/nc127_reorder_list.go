package main

func reordered(values ...int) *ListNode {
	head := list(values...)
	reorderList(head)
	return head
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("reorderList([1,2,3,4])", list(1, 4, 2, 3), reordered(1, 2, 3, 4)),
			tc("reorderList([1,2,3,4,5]) -- the middle stays last", list(1, 5, 2, 4, 3), reordered(1, 2, 3, 4, 5)),
			tc("reorderList([1,2])", list(1, 2), reordered(1, 2)),
			tc("reorderList([1])", list(1), reordered(1)),
			tc("reorderList([])", list(), reordered()),
		}
	})
}
