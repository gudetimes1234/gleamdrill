package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findMedianSortedArrays([1,3], [2])", 2.0, findMedianSortedArrays([]int{1, 3}, []int{2})),
			tc("findMedianSortedArrays([1,2], [3,4])", 2.5, findMedianSortedArrays([]int{1, 2}, []int{3, 4})),
			tc("findMedianSortedArrays([], [1])", 1.0, findMedianSortedArrays([]int{}, []int{1})),
			tc("findMedianSortedArrays([1,2,3,4,5], [6,7,8,9,10])", 5.5, findMedianSortedArrays([]int{1, 2, 3, 4, 5}, []int{6, 7, 8, 9, 10})),
		}
	})
}
