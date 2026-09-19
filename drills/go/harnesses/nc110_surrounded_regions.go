package main

func solved(rows ...string) []string {
	board := make([][]byte, len(rows))
	for i, row := range rows {
		board[i] = []byte(row)
	}
	solve(board)
	out := make([]string, len(board))
	for i, row := range board {
		out[i] = string(row)
	}
	return out
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("solve(the 4x4 example)", []string{"XXXX", "XXXX", "XXXX", "XOXX"}, solved("XXXX", "XOOX", "XXOX", "XOXX")),
			tc("solve([['X']])", []string{"X"}, solved("X")),
			tc("solve(an O on the border survives)", []string{"OX", "XX"}, solved("OX", "XX")),
			tc("solve(a region linked to the border survives)", []string{"OOX", "XOX", "XXX"}, solved("OOX", "XOX", "XXX")),
		}
	})
}
