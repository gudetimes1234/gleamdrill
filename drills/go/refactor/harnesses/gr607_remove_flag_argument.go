package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`schedule(10, "rush")`, 11, schedule(10, "rush")),
			tc(`schedule(10, "standard")`, 13, schedule(10, "standard")),
			tc(`schedule(0, "")`, 3, schedule(0, "")),
			uses(`(?s)func\s+\w+\(\s*\w+\s+int\s*\)\s*int\b.*func\s+\w+\(\s*\w+\s+int\s*\)\s*int\b`, "one named function per behaviour"),
			avoids(`\w+\s+bool\s*\)`, "a bool flag parameter"),
			avoids(`,\s*(true|false)\s*\)`, "true or false passed at the call site"),
		}
	})
}
