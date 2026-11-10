package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`portFrom({"port": 8080})`, "8080, <nil>", outcome(portFrom(map[string]any{"port": 8080}))),
			tc(`portFrom({"port": "80"})`, "0, port is a string, not an int", outcome(portFrom(map[string]any{"port": "80"}))),
			tc(`portFrom({"port": 80.0})`, "0, port is a float64, not an int", outcome(portFrom(map[string]any{"port": 80.0}))),
			tc("portFrom({})", "0, port is missing", outcome(portFrom(map[string]any{}))),
			avoids(`Sprint\w*\(\s*"%T"`, "comparing a %T string"),
			uses(`\w+\s*,\s*\w+\s*:?=\s*\w+\.\(int\)|\.\(type\)`, "a comma-ok type assertion"),
		}
	})
}
