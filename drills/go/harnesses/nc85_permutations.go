package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("permute([1,2,3])", [][]int{{1, 2, 3}, {1, 3, 2}, {2, 1, 3}, {2, 3, 1}, {3, 1, 2}, {3, 2, 1}}, sortSeqs(permute([]int{1, 2, 3}))),
			tc("permute([0,1])", [][]int{{0, 1}, {1, 0}}, sortSeqs(permute([]int{0, 1}))),
			tc("permute([1])", [][]int{{1}}, permute([]int{1})),
			tc("len(permute([1,2,3,4]))", 24, len(permute([]int{1, 2, 3, 4}))),
		}
	})
}
