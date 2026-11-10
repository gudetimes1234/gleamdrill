package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`parsePort("8080")`, "8080, <nil>", outcome(parsePort("8080"))),
			tc(`parsePort("0")`, "0, port 0 out of range", outcome(parsePort("0"))),
			tc(`parsePort("70000")`, "0, port 70000 out of range", outcome(parsePort("70000"))),
			tc(`parsePort("")`, `0, port "" is not a number`, outcome(parsePort(""))),
			avoids(`\}\s*else\b`, "an else after a return"),
			uses(`if\s+\w+\s*!=\s*nil`, "an early return when err != nil"),
		}
	})
}
