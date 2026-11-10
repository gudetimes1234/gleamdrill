package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`firstNegative([]int{3, -1, -4})`, 1, firstNegative([]int{3, -1, -4})),
			tc(`firstNegative([]int{-7}) -- at the start`, 0, firstNegative([]int{-7})),
			tc(`firstNegative([]int{1, 2})`, -1, firstNegative([]int{1, 2})),
			tc(`firstNegative(nil)`, -1, firstNegative(nil)),
			uses(`slices\.IndexFunc\(`, "slices.IndexFunc"),
			avoids(`\bfor\b`, "a hand-written search loop"),
		}
	})
}
