package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`statement("ann", []int{10, 20})`, "Customer: ann\nOwed: 30\n", statement("ann", []int{10, 20})),
			tc(`statement("bo", []int{5})`, "Customer: bo\nOwed: 5\n", statement("bo", []int{5})),
			tc(`statement("cy", nil)`, "Customer: cy\nOwed: 0\n", statement("cy", nil)),
			uses(`func\s+\w+\(\s*\w+\s+(\[\]|\.\.\.)int\s*\)\s*int\b`, "a function that totals the amounts"),
		}
	})
}
