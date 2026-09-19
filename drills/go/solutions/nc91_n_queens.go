package main

import "strings"

func solveNQueens(n int) [][]string {
	result := [][]string{}
	cols := map[int]bool{}
	diagonals := map[int]bool{}     // r - c is constant along one diagonal
	antiDiagonals := map[int]bool{} // r + c along the other
	queens := make([]int, n)        // column of the queen in each row
	var place func(r int)
	place = func(r int) {
		if r == n {
			result = append(result, render(queens))
			return
		}
		for c := 0; c < n; c++ {
			if cols[c] || diagonals[r-c] || antiDiagonals[r+c] {
				continue
			}
			cols[c], diagonals[r-c], antiDiagonals[r+c] = true, true, true
			queens[r] = c
			place(r + 1)
			delete(cols, c)
			delete(diagonals, r-c)
			delete(antiDiagonals, r+c)
		}
	}
	place(0)
	return result
}

func render(queens []int) []string {
	board := make([]string, len(queens))
	for r, c := range queens {
		board[r] = strings.Repeat(".", c) + "Q" + strings.Repeat(".", len(queens)-c-1)
	}
	return board
}
