package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("reverseList([1,2,3,4,5])", list(5, 4, 3, 2, 1), reverseList(list(1, 2, 3, 4, 5))),
			tc("reverseList([1,2])", list(2, 1), reverseList(list(1, 2))),
			tc("reverseList([1])", list(1), reverseList(list(1))),
			tc("reverseList([])", list(), reverseList(list())),
		}
	})
}
