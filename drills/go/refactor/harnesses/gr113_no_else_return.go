package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`plural(1, "cat")`, "1 cat", plural(1, "cat")),
			tc(`plural(3, "dog")`, "3 dogs", plural(3, "dog")),
			tc(`plural(0, "item") -- zero is plural`, "0 items", plural(0, "item")),
			tc(`plural(12, "egg")`, "12 eggs", plural(12, "egg")),
			avoids(`\belse\b`, "an else after return"),
		}
	})
}
