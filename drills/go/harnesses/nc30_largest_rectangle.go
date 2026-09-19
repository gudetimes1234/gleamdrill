package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("largestRectangleArea([2,1,5,6,2,3])", 10, largestRectangleArea([]int{2, 1, 5, 6, 2, 3})),
			tc("largestRectangleArea([2,4])", 4, largestRectangleArea([]int{2, 4})),
			tc("largestRectangleArea([1])", 1, largestRectangleArea([]int{1})),
			tc("largestRectangleArea([3,3,3])", 9, largestRectangleArea([]int{3, 3, 3})),
		}
	})
}
