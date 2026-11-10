package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`profileLine("Ann", 31)`, "Ann (31)", profileLine("Ann", 31)),
			tc(`profileLine("Bo", 0)`, "Bo (0)", profileLine("Bo", 0)),
			tc(`profileLine("", 7)`, " (7)", profileLine("", 7)),
			uses(`\btype\s+\w+\s+struct\b`, "a User struct"),
			avoids(`map\[string\](any|interface\s*\{\s*\})`, "a map[string]any record"),
		}
	})
}
