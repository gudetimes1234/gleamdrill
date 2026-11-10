package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`firstSeen([]string{"b", "a", "b", "c", "a"})`, []string{"b", "a", "c"}, firstSeen([]string{"b", "a", "b", "c", "a"})),
			tc(`firstSeen([]string{"x", "x"})`, []string{"x"}, firstSeen([]string{"x", "x"})),
			tc(`firstSeen([]string{"a", "b"}) -- no repeats`, []string{"a", "b"}, firstSeen([]string{"a", "b"})),
			tc(`firstSeen(nil)`, []string{}, firstSeen(nil)),
			uses(`map\[string\]\s*(bool|struct\s*\{\s*\})`, "a map as a set"),
			avoids(`\bfor\b[^{}]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\bfor\b`, "a loop inside a loop"),
		}
	})
}
