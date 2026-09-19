package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("mergeTwoLists([1,2,4], [1,3,4])", list(1, 1, 2, 3, 4, 4), mergeTwoLists(list(1, 2, 4), list(1, 3, 4))),
			tc("mergeTwoLists([], [])", list(), mergeTwoLists(list(), list())),
			tc("mergeTwoLists([], [0])", list(0), mergeTwoLists(list(), list(0))),
			tc("mergeTwoLists([5], [1,2])", list(1, 2, 5), mergeTwoLists(list(5), list(1, 2))),
		}
	})
}
