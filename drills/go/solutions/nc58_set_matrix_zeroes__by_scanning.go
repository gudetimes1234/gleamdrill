package main

func setZeroes(matrix [][]int) {
	zeroRows := map[int]bool{}
	zeroCols := map[int]bool{}
	for r, row := range matrix {
		for c, cell := range row {
			if cell == 0 {
				zeroRows[r] = true
				zeroCols[c] = true
			}
		}
	}
	for r, row := range matrix {
		for c := range row {
			if zeroRows[r] || zeroCols[c] {
				row[c] = 0
			}
		}
	}
}
