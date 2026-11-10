package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`sameOrder([]string{"a", "b"}, []string{"a", "b"})`, true, sameOrder([]string{"a", "b"}, []string{"a", "b"})),
			tc(`sameOrder([]string{"a", "b"}, []string{"b", "a"})`, false, sameOrder([]string{"a", "b"}, []string{"b", "a"})),
			tc(`sameOrder([]string{"a"}, []string{"a", "b"}) -- lengths differ`, false, sameOrder([]string{"a"}, []string{"a", "b"})),
			tc(`sameOrder(nil, []string{}) -- both empty`, true, sameOrder(nil, []string{})),
			uses(`slices\.Equal\(`, "slices.Equal"),
			avoids(`\bfor\b`, "a compare loop"),
		}
	})
}
