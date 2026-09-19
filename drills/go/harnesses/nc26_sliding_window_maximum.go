package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)", []int{3, 3, 5, 5, 6, 7}, maxSlidingWindow([]int{1, 3, -1, -3, 5, 3, 6, 7}, 3)),
			tc("maxSlidingWindow([1], 1)", []int{1}, maxSlidingWindow([]int{1}, 1)),
			tc("maxSlidingWindow([9, 8, 7], 2)", []int{9, 8}, maxSlidingWindow([]int{9, 8, 7}, 2)),
			tc("maxSlidingWindow([1, 1, 1], 2)", []int{1, 1}, maxSlidingWindow([]int{1, 1, 1}, 2)),
		}
	})
}
