require "set"

def set_zeroes(matrix)
  # Two passes, and they cannot be one: writing a zero as you find it would be
  # indistinguishable from a zero that was already there, and the whole grid
  # would clear. So record which rows and columns are doomed first, then apply.
  rows = Set.new
  columns = Set.new
  matrix.each_with_index do |row, r|
    row.each_with_index do |value, c|
      if value.zero?
        rows << r
        columns << c
      end
    end
  end

  matrix.each_with_index.map do |row, r|
    row.each_with_index.map { |value, c| rows.include?(r) || columns.include?(c) ? 0 : value }
  end
end
