package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("kClosest([[1,3],[-2,2]], 1)", [][]int{{-2, 2}}, sortRows(kClosest([][]int{{1, 3}, {-2, 2}}, 1))),
			tc("kClosest([[3,3],[5,-1],[-2,4]], 2)", [][]int{{-2, 4}, {3, 3}}, sortRows(kClosest([][]int{{3, 3}, {5, -1}, {-2, 4}}, 2))),
			tc("kClosest([], 0)", [][]int{}, sortRows(kClosest([][]int{}, 0))),
			tc("kClosest([[1,1],[2,2],[3,3]], 2)", [][]int{{1, 1}, {2, 2}}, sortRows(kClosest([][]int{{1, 1}, {2, 2}, {3, 3}}, 2))),
		}
	})
}
