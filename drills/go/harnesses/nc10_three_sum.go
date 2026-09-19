package main

// Triples are compared as a set: only their contents are meaningful.
func main() {
	run(func() []testCase {
		return []testCase{
			tc("threeSum([-1, 0, 1, 2, -1, -4])", [][]int{{-1, -1, 2}, {-1, 0, 1}}, sortRows(threeSum([]int{-1, 0, 1, 2, -1, -4}))),
			tc("threeSum([0, 1, 1])", [][]int{}, sortRows(threeSum([]int{0, 1, 1}))),
			tc("threeSum([0, 0, 0])", [][]int{{0, 0, 0}}, sortRows(threeSum([]int{0, 0, 0}))),
		}
	})
}
