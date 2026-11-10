package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`insertAt([]string{"a", "c"}, 1, "b")`, []string{"a", "b", "c"}, insertAt([]string{"a", "c"}, 1, "b")),
			tc(`insertAt([]string{"b"}, 0, "a") -- at the front`, []string{"a", "b"}, insertAt([]string{"b"}, 0, "a")),
			tc(`insertAt([]string{"a"}, 1, "z") -- at the end`, []string{"a", "z"}, insertAt([]string{"a"}, 1, "z")),
			tc(`insertAt(nil, 0, "x")`, []string{"x"}, insertAt(nil, 0, "x")),
			uses(`slices\.Insert\(`, "slices.Insert"),
			avoids(`\bappend\(`, "append slicing"),
		}
	})
}
