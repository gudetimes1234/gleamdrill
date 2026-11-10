package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`describe(7)`, "int 7", describe(7)),
			tc(`describe("hi")`, "string hi", describe("hi")),
			tc(`describe(true)`, "bool true", describe(true)),
			tc(`describe(2.5)`, "unknown", describe(2.5)),
			tc(`describe(nil)`, "unknown", describe(nil)),
			uses(`\.\(\s*type\s*\)`, "a type switch"),
			avoids(`\.\(\s*(int|string|bool)\s*\)`, "a chained type assertion"),
		}
	})
}
