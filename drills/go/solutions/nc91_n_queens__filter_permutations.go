package main

import "strings"

func solveNQueens(n int) [][]string {
	// One queen per row and per column means a placement is a permutation
	// of columns; generate them all and keep those with no diagonal clash.
	result := [][]string{}
	used := make([]bool, n)
	queens := []int{}
	var build func()
	build = func() {
		if len(queens) == n {
			if noDiagonalClash(queens) {
				result = append(result, render(queens))
			}
			return
		}
		for c := 0; c < n; c++ {
			if used[c] {
				continue
			}
			used[c] = true
			queens = append(queens, c)
			build()
			queens = queens[:len(queens)-1]
			used[c] = false
		}
	}
	build()
	return result
}

func noDiagonalClash(queens []int) bool {
	for r1, c1 := range queens {
		for r2 := r1 + 1; r2 < len(queens); r2++ {
			if r2-r1 == queens[r2]-c1 || r2-r1 == c1-queens[r2] {
				return false
			}
		}
	}
	return true
}

func render(queens []int) []string {
	board := make([]string, len(queens))
	for r, c := range queens {
		board[r] = strings.Repeat(".", c) + "Q" + strings.Repeat(".", len(queens)-c-1)
	}
	return board
}
