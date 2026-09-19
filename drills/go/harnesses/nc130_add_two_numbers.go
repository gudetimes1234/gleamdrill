package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("addTwoNumbers([2,4,3], [5,6,4]) -- 342 + 465", list(7, 0, 8), addTwoNumbers(list(2, 4, 3), list(5, 6, 4))),
			tc("addTwoNumbers([0], [0])", list(0), addTwoNumbers(list(0), list(0))),
			tc("addTwoNumbers([9,9,9,9,9,9,9], [9,9,9,9])", list(8, 9, 9, 9, 0, 0, 0, 1), addTwoNumbers(list(9, 9, 9, 9, 9, 9, 9), list(9, 9, 9, 9))),
			tc("addTwoNumbers([5], [5]) -- a carry makes a new digit", list(0, 1), addTwoNumbers(list(5), list(5))),
		}
	})
}
