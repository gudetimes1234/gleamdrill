package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`clock(125)`, "2:05", clock(125)),
			tc(`clock(59)`, "0:59", clock(59)),
			tc(`clock(3600)`, "60:00", clock(3600)),
			tc(`clock(0)`, "0:00", clock(0)),
			uses(`func\s+\w+\([^)]*\)\s*\([^)]*,[^)]*\)`, "a function returning two values"),
			avoids(`\*int\b`, "out-pointer parameters"),
		}
	})
}
