package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("progressBar(3, 5)", "[###--]", progressBar(3, 5)),
			tc("progressBar(0, 4)", "[----]", progressBar(0, 4)),
			tc("progressBar(4, 4)", "[####]", progressBar(4, 4)),
			tc("progressBar(0, 0)", "[]", progressBar(0, 0)),
			avoids(`\bfor\b`, "a loop"),
			uses(`strings\.Repeat\(`, "strings.Repeat"),
		}
	})
}
