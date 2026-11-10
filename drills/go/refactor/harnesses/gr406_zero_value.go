package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`countOf([]string{"a", "b", "a"}, "a")`, 2, countOf([]string{"a", "b", "a"}, "a")),
			tc(`countOf([]string{"a", "b"}, "z")`, 0, countOf([]string{"a", "b"}, "z")),
			tc(`countOf(nil, "a")`, 0, countOf(nil, "a")),
			uses(`==\s*nil`, "a nil check that makes the map on first use"),
			avoids(`\bInit\(`, "an Init method"),
		}
	})
}
