package main

func cells(rows ...string) [][]byte {
	out := make([][]byte, len(rows))
	for i, row := range rows {
		out[i] = []byte(row)
	}
	return out
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("numIslands(one big island)", 1, numIslands(cells("11110", "11010", "11000", "00000"))),
			tc("numIslands(three islands)", 3, numIslands(cells("11000", "11000", "00100", "00011"))),
			tc("numIslands(all water)", 0, numIslands(cells("000", "000"))),
			tc("numIslands([['1']])", 1, numIslands(cells("1"))),
			tc("numIslands(diagonals do not connect)", 2, numIslands(cells("10", "01"))),
		}
	})
}
