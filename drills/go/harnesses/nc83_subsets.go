package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("subsets([1,2,3])", [][]int{{}, {1}, {1, 2}, {1, 2, 3}, {1, 3}, {2}, {2, 3}, {3}}, sortRows(subsets([]int{1, 2, 3}))),
			tc("subsets([0])", [][]int{{}, {0}}, sortRows(subsets([]int{0}))),
			tc("subsets([])", [][]int{{}}, sortRows(subsets([]int{}))),
			tc("len(subsets([1,2,3,4,5]))", 32, len(subsets([]int{1, 2, 3, 4, 5}))),
		}
	})
}
