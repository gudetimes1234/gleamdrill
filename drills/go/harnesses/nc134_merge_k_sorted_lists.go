package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("mergeKLists([[1,4,5],[1,3,4],[2,6]])", list(1, 1, 2, 3, 4, 4, 5, 6), mergeKLists([]*ListNode{list(1, 4, 5), list(1, 3, 4), list(2, 6)})),
			tc("mergeKLists([]) -- no lists at all", list(), mergeKLists([]*ListNode{})),
			tc("mergeKLists([[]]) -- one empty list", list(), mergeKLists([]*ListNode{nil})),
			tc("mergeKLists([[1],[],[0]])", list(0, 1), mergeKLists([]*ListNode{list(1), nil, list(0)})),
			tc("mergeKLists([[2,2],[2]]) -- ties everywhere", list(2, 2, 2), mergeKLists([]*ListNode{list(2, 2), list(2)})),
		}
	})
}
