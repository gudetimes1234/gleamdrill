package main

func grid(rows ...string) [][]byte {
	out := make([][]byte, len(rows))
	for i, row := range rows {
		out[i] = []byte(row)
	}
	return out
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("exist(board, 'ABCCED')", true, exist(grid("ABCE", "SFCS", "ADEE"), "ABCCED")),
			tc("exist(board, 'SEE')", true, exist(grid("ABCE", "SFCS", "ADEE"), "SEE")),
			tc("exist(board, 'ABCB') -- a cell may not be reused", false, exist(grid("ABCE", "SFCS", "ADEE"), "ABCB")),
			tc("exist([['a']], 'a')", true, exist(grid("a"), "a")),
			tc("exist([['a']], 'b')", false, exist(grid("a"), "b")),
		}
	})
}
