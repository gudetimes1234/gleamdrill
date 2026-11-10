package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`normalSummary([]int{55, 72, 100, 101})`, "2 normal, total 172", normalSummary([]int{55, 72, 100, 101})),
			tc(`normalSummary([]int{60})`, "1 normal, total 60", normalSummary([]int{60})),
			tc(`normalSummary(nil)`, "0 normal, total 0", normalSummary(nil)),
			uses(`\btype\s+\w+\s+struct\b`, "a Range struct"),
			avoids(`\w+\s*,\s*\w+\s+int\s*\)`, "low and high passed as two ints"),
		}
	})
}
