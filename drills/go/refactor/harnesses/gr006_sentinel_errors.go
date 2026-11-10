package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("withdraw(100, 30)", "70, <nil>", outcome(withdraw(100, 30))),
			tc("withdraw(10, 50)", "10, insufficient funds", outcome(withdraw(10, 50))),
			tc("withdraw(10, 0)", "10, amount must be positive", outcome(withdraw(10, 0))),
			tc("reserve(100, 80, 30)", "80, insufficient funds", outcome(reserve(100, 80, 30))),
			tc("reserve(100, 0, 30)", "30, <nil>", outcome(reserve(100, 0, 30))),
			avoids(`return[^\n]*errors\.New\(`, "errors.New built at the return"),
			uses(`(?s)\bvar\b.*errors\.New\(`, "a package-level sentinel error"),
		}
	})
}
