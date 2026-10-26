def is_valid_sudoku(board)
  units(board).all? { |unit| no_duplicates(unit) }
end

def units(board)
  rows = board.map(&:dup)
  columns = board.transpose
  boxes = [0, 3, 6].product([0, 3, 6]).map do |br, bc|
    (br...br + 3).flat_map { |r| board[r][bc, 3] }
  end
  rows + columns + boxes
end

def no_duplicates(unit)
  filled = unit.reject { |value| value == "." }
  filled.length == filled.uniq.length
end
