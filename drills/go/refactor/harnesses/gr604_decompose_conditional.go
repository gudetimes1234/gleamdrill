package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`charge(7, 10)`, 150, charge(7, 10)),
			tc(`charge(8, 2)`, 30, charge(8, 2)),
			tc(`charge(1, 10)`, 220, charge(1, 10)),
			tc(`charge(9, 1)`, 112, charge(9, 1)),
			tc(`charge(6, 0)`, 0, charge(6, 0)),
			uses(`func\s+\w+\(\s*\w+\s+int\s*\)\s*bool\b`, "a named predicate for the condition"),
			avoids(`if\s+[^{]*&&`, "the raw range test in the if"),
		}
	})
}
