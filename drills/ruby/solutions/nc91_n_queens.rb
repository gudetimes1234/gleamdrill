require "set"

def solve_n_queens(n)
  boards = []

  # One queen per row, so the only choice is which column. A diagonal is
  # identified by row - column and an anti-diagonal by row + column, which
  # turns "is this square attacked?" into three set lookups, and lets the
  # search abandon a whole subtree the moment one fails.
  place = lambda do |row, chosen, columns, diagonals, anti_diagonals|
    if row == n
      boards << chosen.map { |c| "." * c + "Q" + "." * (n - c - 1) }
      return
    end
    n.times do |column|
      next if columns.include?(column) || diagonals.include?(row - column) || anti_diagonals.include?(row + column)

      place.(
        row + 1,
        chosen + [column],
        columns | [column],
        diagonals | [row - column],
        anti_diagonals | [row + column]
      )
    end
  end

  place.(0, [], Set.new, Set.new, Set.new)
  boards
end
