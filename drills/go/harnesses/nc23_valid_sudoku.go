package main

func board(rows ...string) [][]byte {
	out := make([][]byte, len(rows))
	for i, row := range rows {
		out[i] = []byte(row)
	}
	return out
}

func main() {
	run(func() []testCase {
		valid := board(
			"53..7....", "6..195...", ".98....6.",
			"8...6...3", "4..8.3..1", "7...2...6",
			".6....28.", "...419..5", "....8..79")
		rowRepeat := board(
			"53..7...5", "6..195...", ".98....6.",
			"8...6...3", "4..8.3..1", "7...2...6",
			".6....28.", "...419..5", "....8..79")
		boxRepeat := board(
			"83..7....", "6..195...", ".98....6.",
			"8...6...3", "4..8.3..1", "7...2...6",
			".6....28.", "...419..5", "....8..79")
		return []testCase{
			tc("a valid board", true, isValidSudoku(valid)),
			tc("a 5 twice in the first row", false, isValidSudoku(rowRepeat)),
			tc("an 8 twice in the top-left box", false, isValidSudoku(boxRepeat)),
		}
	})
}
