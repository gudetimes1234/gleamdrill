package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		inv := map[string]int{"apple": 4, "pear": 0}
		return []testCase{
			tc(`stockOf(inv, "apple")`, "4, <nil>", outcome(stockOf(inv, "apple"))),
			tc(`stockOf(inv, "pear") -- present at zero`, "0, <nil>", outcome(stockOf(inv, "pear"))),
			tc(`stockOf(inv, "kiwi")`, `0, unknown item "kiwi"`, outcome(stockOf(inv, "kiwi"))),
			tc(`stockOf(nil, "apple")`, `0, unknown item "apple"`, outcome(stockOf(nil, "apple"))),
			avoids(`\brange\b`, "a loop over the map"),
			uses(`\w+\s*,\s*\w+\s*:?=\s*\w+\[`, "a comma-ok lookup"),
		}
	})
}
