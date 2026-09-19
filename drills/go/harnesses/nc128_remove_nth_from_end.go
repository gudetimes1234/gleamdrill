package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("removeNthFromEnd([1,2,3,4,5], 2)", list(1, 2, 3, 5), removeNthFromEnd(list(1, 2, 3, 4, 5), 2)),
			tc("removeNthFromEnd([1], 1)", list(), removeNthFromEnd(list(1), 1)),
			tc("removeNthFromEnd([1,2], 1)", list(1), removeNthFromEnd(list(1, 2), 1)),
			tc("removeNthFromEnd([1,2], 2) -- the head goes", list(2), removeNthFromEnd(list(1, 2), 2)),
		}
	})
}
