package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findKthLargest([3,2,1,5,6,4], 2)", 5, findKthLargest([]int{3, 2, 1, 5, 6, 4}, 2)),
			tc("findKthLargest([3,2,3,1,2,4,5,5,6], 4)", 4, findKthLargest([]int{3, 2, 3, 1, 2, 4, 5, 5, 6}, 4)),
			tc("findKthLargest([1], 1)", 1, findKthLargest([]int{1}, 1)),
			tc("findKthLargest([2,1], 2)", 1, findKthLargest([]int{2, 1}, 2)),
		}
	})
}
