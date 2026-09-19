package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("minInterval([[1,4],[2,4],[3,6],[4,4]], [2,3,4,5])", []int{3, 3, 1, 4}, minInterval([][]int{{1, 4}, {2, 4}, {3, 6}, {4, 4}}, []int{2, 3, 4, 5})),
			tc("minInterval([[2,3],[2,5],[1,8],[20,25]], [2,19,5,22])", []int{2, -1, 4, 6}, minInterval([][]int{{2, 3}, {2, 5}, {1, 8}, {20, 25}}, []int{2, 19, 5, 22})),
			tc("minInterval([], [1,2])", []int{-1, -1}, minInterval([][]int{}, []int{1, 2})),
			tc("minInterval([[1,10]], [])", []int{}, minInterval([][]int{{1, 10}}, []int{})),
			tc("minInterval([[1,3]], [0,4])", []int{-1, -1}, minInterval([][]int{{1, 3}}, []int{0, 4})),
		}
	})
}
