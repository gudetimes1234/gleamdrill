package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`tally([]int{6, 1, 6}, []string{"urgent", "low"})`, []int{2, 1}, tally([]int{6, 1, 6}, []string{"urgent", "low"})),
			tc(`tally([]int{1, 2}, []string{"urgent", "urgent"})`, []int{0, 2}, tally([]int{1, 2}, []string{"urgent", "urgent"})),
			tc(`tally([]int{6}, []string{"low"})`, []int{1, 0}, tally([]int{6}, []string{"low"})),
			tc(`tally(nil, nil) -- nothing to count`, []int{0, 0}, tally(nil, nil)),
			uses(`func\s+\w+\s*\[\s*\w+\s+[^\]]+\]\s*\(`, "a generic function"),
			avoids(`(?s)\bfor\b.*\bfor\b`, "two copies of the loop"),
		}
	})
}
