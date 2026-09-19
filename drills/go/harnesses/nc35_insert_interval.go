package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("insert([[1,3],[6,9]], [2,5])", [][]int{{1, 5}, {6, 9}}, insert([][]int{{1, 3}, {6, 9}}, []int{2, 5})),
			tc("insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])", [][]int{{1, 2}, {3, 10}, {12, 16}}, insert([][]int{{1, 2}, {3, 5}, {6, 7}, {8, 10}, {12, 16}}, []int{4, 8})),
			tc("insert([], [5,7])", [][]int{{5, 7}}, insert([][]int{}, []int{5, 7})),
			tc("insert([[1,5]], [6,8])", [][]int{{1, 5}, {6, 8}}, insert([][]int{{1, 5}}, []int{6, 8})),
			tc("insert([[3,5]], [1,2])", [][]int{{1, 2}, {3, 5}}, insert([][]int{{3, 5}}, []int{1, 2})),
		}
	})
}
