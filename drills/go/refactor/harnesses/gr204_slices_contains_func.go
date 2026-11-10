package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`hasBlank([]string{"a", "  ", "b"})`, true, hasBlank([]string{"a", "  ", "b"})),
			tc(`hasBlank([]string{"\t"}) -- only whitespace`, true, hasBlank([]string{"\t"})),
			tc(`hasBlank([]string{"a", "b"})`, false, hasBlank([]string{"a", "b"})),
			tc(`hasBlank(nil)`, false, hasBlank(nil)),
			uses(`slices\.ContainsFunc\(`, "slices.ContainsFunc"),
			avoids(`\bfor\b`, "a hand-written search loop"),
		}
	})
}
