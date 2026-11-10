package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		staff := []string{"ann", "bob", "cy"}
		return []testCase{
			tc(`userIndex(staff, "bob")`, "1, <nil>", outcome(userIndex(staff, "bob"))),
			tc(`userIndex(staff, "ann")`, "0, <nil>", outcome(userIndex(staff, "ann"))),
			tc(`userIndex(staff, "dee")`, `0, no user "dee"`, outcome(userIndex(staff, "dee"))),
			tc(`userIndex(nil, "ann")`, `0, no user "ann"`, outcome(userIndex(nil, "ann"))),
			avoids(`-\s*1\b`, "a -1 marker"),
			avoids(`\bbreak\b`, "break then check"),
		}
	})
}
