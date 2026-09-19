package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("getSum(1, 2)", 3, getSum(1, 2)),
			tc("getSum(2, 3)", 5, getSum(2, 3)),
			tc("getSum(-1, 1)", 0, getSum(-1, 1)),
			tc("getSum(-2, -3)", -5, getSum(-2, -3)),
			tc("getSum(0, 0)", 0, getSum(0, 0)),
			tc("getSum(5, -3)", 2, getSum(5, -3)),
		}
	})
}
