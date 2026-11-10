package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`userPath("42")`, "users/42", userPath("42")),
			tc(`postPath("ann", "7")`, "users/ann/posts/7", postPath("ann", "7")),
			tc(`userPath("")`, "users/", userPath("")),
			uses(`\.\.\.string\b`, "a variadic ...string parameter"),
			avoids(`\[\]string\s*\{`, "a slice literal at each call site"),
		}
	})
}
