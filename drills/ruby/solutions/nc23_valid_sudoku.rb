require "set"

def is_valid_sudoku(board)
  seen = Set.new
  board.each_with_index do |row, r|
    row.each_with_index do |value, c|
      next if value == "."

      keys = [
        [value, "row", r],
        [value, "col", c],
        [value, "box", r / 3, c / 3]
      ]
      return false if keys.any? { |key| seen.include?(key) }

      seen.merge(keys)
    end
  end
  true
end
