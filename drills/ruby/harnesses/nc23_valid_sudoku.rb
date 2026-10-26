need :is_valid_sudoku

# Nine row strings rather than a 9x9 literal: the board stays readable, and a
# single changed cell is what each invalid case is.
ROWS = [
  "53..7....",
  "6..195...",
  ".98....6.",
  "8...6...3",
  "4..8.3..1",
  "7...2...6",
  ".6....28.",
  "...419..5",
  "....8..79"
].freeze

def board = ROWS.map(&:chars)

def with_cell(r, c, value) = board.tap { |b| b[r][c] = value }

tc "is_valid_sudoku(valid board)", true, is_valid_sudoku(board)
tc "is_valid_sudoku(5 twice in row 0)", false, is_valid_sudoku(with_cell(0, 2, "5"))
tc "is_valid_sudoku(5 twice in column 0, different boxes)", false, is_valid_sudoku(with_cell(3, 0, "5"))
tc "is_valid_sudoku(3 twice in the top-left box only)", false, is_valid_sudoku(with_cell(2, 0, "3"))
tc "is_valid_sudoku(empty board)", true, is_valid_sudoku(Array.new(9) { Array.new(9, ".") })
