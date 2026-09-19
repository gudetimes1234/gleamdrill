package main

import "strings"

func boards(n int) []string {
	out := []string{}
	for _, board := range solveNQueens(n) {
		out = append(out, strings.Join(board, "|"))
	}
	return sortStrings(out)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("solveNQueens(4)", []string{"..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."}, boards(4)),
			tc("solveNQueens(1)", []string{"Q"}, boards(1)),
			tc("solveNQueens(2)", []string{}, boards(2)),
			tc("solveNQueens(3)", []string{}, boards(3)),
			tc("len(solveNQueens(6))", 4, len(solveNQueens(6))),
		}
	})
}
