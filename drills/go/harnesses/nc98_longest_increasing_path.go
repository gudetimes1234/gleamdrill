package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]])", 4, longestIncreasingPath([][]int{{9, 9, 4}, {6, 6, 8}, {2, 1, 1}})),
			tc("longestIncreasingPath([[3,4,5],[3,2,6],[2,2,1]])", 4, longestIncreasingPath([][]int{{3, 4, 5}, {3, 2, 6}, {2, 2, 1}})),
			tc("longestIncreasingPath([[1]])", 1, longestIncreasingPath([][]int{{1}})),
			tc("longestIncreasingPath([[7,7],[7,7]])", 1, longestIncreasingPath([][]int{{7, 7}, {7, 7}})),
		}
	})
}
