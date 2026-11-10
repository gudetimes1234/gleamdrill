package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`squares([]int{1, 2, 3})`, []int{1, 4, 9}, squares([]int{1, 2, 3})),
			tc(`squares([]int{0, -3}) -- zero and negative`, []int{0, 9}, squares([]int{0, -3})),
			tc(`squares([]int{10})`, []int{100}, squares([]int{10})),
			tc(`len(squares(nil))`, 0, len(squares(nil))),
			uses(`make\(\s*\[\]int\s*,[^)]*len\(`, "make sized from len(nums)"),
		}
	})
}
