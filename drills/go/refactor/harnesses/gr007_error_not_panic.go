package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`parseAge("42")`, "42, <nil>", outcome(parseAge("42"))),
			tc(`parseAge("abc")`, `0, age "abc" is not a number`, outcome(parseAge("abc"))),
			tc(`parseAge("-1")`, "0, age -1 out of range", outcome(parseAge("-1"))),
			tc(`parseAge("")`, `0, age "" is not a number`, outcome(parseAge(""))),
			avoids(`\bpanic\(`, "panic"),
			avoids(`\brecover\(`, "recover"),
		}
	})
}
