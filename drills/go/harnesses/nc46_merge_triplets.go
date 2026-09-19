package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("mergeTriplets([[2,5,3],[1,8,4],[1,7,5]], [2,7,5])", true, mergeTriplets([][]int{{2, 5, 3}, {1, 8, 4}, {1, 7, 5}}, []int{2, 7, 5})),
			tc("mergeTriplets([[3,4,5],[4,5,6]], [3,2,5])", false, mergeTriplets([][]int{{3, 4, 5}, {4, 5, 6}}, []int{3, 2, 5})),
			tc("mergeTriplets([[2,5,3],[2,3,4],[1,2,5],[5,2,3]], [5,5,5])", true, mergeTriplets([][]int{{2, 5, 3}, {2, 3, 4}, {1, 2, 5}, {5, 2, 3}}, []int{5, 5, 5})),
			tc("mergeTriplets([], [1,1,1])", false, mergeTriplets([][]int{}, []int{1, 1, 1})),
			tc("mergeTriplets([[1,2,3]], [3,2,1])", false, mergeTriplets([][]int{{1, 2, 3}}, []int{3, 2, 1})),
		}
	})
}
