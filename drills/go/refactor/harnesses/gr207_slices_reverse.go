package main

func main() {
	run(func() []testCase {
		a := []string{"a", "b", "c"}
		reverseSteps(a)
		b := []string{"x", "y"}
		reverseSteps(b)
		c := []string{"solo"}
		reverseSteps(c)
		d := []string{}
		reverseSteps(d)
		return []testCase{
			tc(`reverseSteps([]string{"a", "b", "c"})`, []string{"c", "b", "a"}, a),
			tc(`reverseSteps([]string{"x", "y"})`, []string{"y", "x"}, b),
			tc(`reverseSteps([]string{"solo"})`, []string{"solo"}, c),
			tc(`reverseSteps([]string{})`, []string{}, d),
			uses(`slices\.Reverse\(`, "slices.Reverse"),
			avoids(`\bfor\b`, "a swap loop"),
		}
	})
}
