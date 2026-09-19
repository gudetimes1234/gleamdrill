package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("myPow(2.0, 10)", 1024.0, myPow(2.0, 10)),
			tc("myPow(2.0, -2)", 0.25, myPow(2.0, -2)),
			tc("myPow(2.0, 0)", 1.0, myPow(2.0, 0)),
			tc("myPow(0.5, 3)", 0.125, myPow(0.5, 3)),
			tc("myPow(-2.0, 3)", -8.0, myPow(-2.0, 3)),
			tc("myPow(0.0, 5)", 0.0, myPow(0.0, 5)),
		}
	})
}
