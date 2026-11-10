package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`numbered([]string{"ann", "bo"})`, []string{"1. ann", "2. bo"}, numbered([]string{"ann", "bo"})),
			tc(`numbered([]string{"cy"}) -- starts again at 1`, []string{"1. cy"}, numbered([]string{"cy"})),
			tc(`numbered(nil)`, []string{}, numbered(nil)),
			uses(`func\s*\(\)`, "a closure that holds the count"),
			avoids(`(?m)^var\s`, "package-level state"),
		}
	})
}
