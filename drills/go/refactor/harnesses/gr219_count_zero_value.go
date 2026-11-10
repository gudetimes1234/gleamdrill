package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`wordCounts([]string{"a", "b", "a"})`, map[string]int{"a": 2, "b": 1}, wordCounts([]string{"a", "b", "a"})),
			tc(`wordCounts([]string{"go", "go", "go"})`, map[string]int{"go": 3}, wordCounts([]string{"go", "go", "go"})),
			tc(`wordCounts([]string{"x"})`, map[string]int{"x": 1}, wordCounts([]string{"x"})),
			tc(`wordCounts(nil) -- no words`, map[string]int{}, wordCounts(nil)),
			uses(`\[\s*\w+\s*\]\s*(\+\+|\+=\s*1\b)`, "counts[w]++"),
			avoids(`\bif\b`, "an existence check"),
		}
	})
}
