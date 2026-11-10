package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`spread([]int{3, 9, 1})`, 8, spread([]int{3, 9, 1})),
			tc(`spread([]int{-4, -2}) -- all negative`, 2, spread([]int{-4, -2})),
			tc(`spread([]int{5})`, 0, spread([]int{5})),
			tc(`spread(nil)`, 0, spread(nil)),
			uses(`slices\.Max\(`, "slices.Max"),
			uses(`slices\.Min\(`, "slices.Min"),
			avoids(`\bfor\b`, "a running min/max loop"),
		}
	})
}
