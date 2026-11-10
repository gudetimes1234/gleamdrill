package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`countWords("the quick fox")`, 3, countWords("the quick fox")),
			tc(`countWords("  lots   of  space ")`, 3, countWords("  lots   of  space ")),
			tc(`countWords("one")`, 1, countWords("one")),
			tc(`countWords("")`, 0, countWords("")),
			avoids(`strings\.Split\(`, "strings.Split"),
			uses(`strings\.Fields\(`, "strings.Fields"),
		}
	})
}
