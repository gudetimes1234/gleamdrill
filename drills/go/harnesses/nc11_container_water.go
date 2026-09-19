package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])", 49, maxArea([]int{1, 8, 6, 2, 5, 4, 8, 3, 7})),
			tc("maxArea([1, 1])", 1, maxArea([]int{1, 1})),
		}
	})
}
