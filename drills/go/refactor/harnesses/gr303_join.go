package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`csvRow([]string{"id", "name", "age"})`, "id,name,age", csvRow([]string{"id", "name", "age"})),
			tc(`csvRow([]string{"solo"})`, "solo", csvRow([]string{"solo"})),
			tc(`csvRow([]string{"", "x"})`, ",x", csvRow([]string{"", "x"})),
			tc("csvRow(nil)", "", csvRow(nil)),
			avoids(`\bfor\b`, "a loop"),
			uses(`strings\.Join\(`, "strings.Join"),
		}
	})
}
