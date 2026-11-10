package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`label("home", Point{1, 2})`, "home at (1, 2)", label("home", Point{1, 2})),
			tc(`label("origin", Point{})`, "origin at (0, 0)", label("origin", Point{})),
			tc(`label("", Point{-3, 4})`, " at (-3, 4)", label("", Point{-3, 4})),
			uses(`\)\s*String\(\)\s*string\b`, "a String method"),
			avoids(`func\s+describe\w*\(`, "a describe helper"),
		}
	})
}
