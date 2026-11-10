package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`sumAll([]string{"1", "2", "3"})`, "6, <nil>", outcome(sumAll([]string{"1", "2", "3"}))),
			tc("sumAll(nil)", "0, <nil>", outcome(sumAll(nil))),
			tc(`sumAll([]string{"4", "x"})`, `0, strconv.Atoi: parsing "x": invalid syntax`, outcome(sumAll([]string{"4", "x"}))),
			tc(`sumAll([]string{"-2", "2"})`, "0, <nil>", outcome(sumAll([]string{"-2", "2"}))),
			avoids(`(?s)var\s+err\s+error.*\w+\s*,\s*err\s*:=`, "an outer err shadowed by :="),
			uses(`return\s+\w+\s*,\s*nil`, "an explicit nil on success"),
		}
	})
}
