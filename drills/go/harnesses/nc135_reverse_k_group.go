package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("reverseKGroup([1,2,3,4,5], 2)", list(2, 1, 4, 3, 5), reverseKGroup(list(1, 2, 3, 4, 5), 2)),
			tc("reverseKGroup([1,2,3,4,5], 3) -- the last two are left alone", list(3, 2, 1, 4, 5), reverseKGroup(list(1, 2, 3, 4, 5), 3)),
			tc("reverseKGroup([1,2,3,4], 4)", list(4, 3, 2, 1), reverseKGroup(list(1, 2, 3, 4), 4)),
			tc("reverseKGroup([1,2,3], 1) -- nothing changes", list(1, 2, 3), reverseKGroup(list(1, 2, 3), 1)),
			tc("reverseKGroup([1,2], 5) -- the group never fills", list(1, 2), reverseKGroup(list(1, 2), 5)),
			tc("reverseKGroup([], 2)", list(), reverseKGroup(list(), 2)),
		}
	})
}
