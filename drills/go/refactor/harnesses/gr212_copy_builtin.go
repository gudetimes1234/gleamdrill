package main

func main() {
	run(func() []testCase {
		src := []int{1, 2, 3}
		snap := snapshot(src)
		src[0] = 99
		return []testCase{
			tc(`snapshot([]int{1, 2, 3}) -- then src[0] = 99`, []int{1, 2, 3}, snap),
			tc(`snapshot([]int{7})`, []int{7}, snapshot([]int{7})),
			tc(`snapshot([]int{})`, []int{}, snapshot([]int{})),
			tc(`len(snapshot(nil))`, 0, len(snapshot(nil))),
			uses(`\bcopy\(|slices\.Clone\(`, "copy"),
			avoids(`\bfor\b`, "an element-by-element loop"),
		}
	})
}
