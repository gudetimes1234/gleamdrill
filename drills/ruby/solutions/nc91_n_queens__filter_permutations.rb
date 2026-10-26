def solve_n_queens(n)
  # One queen per row with no two sharing a column *is* a permutation of the
  # columns, so the row and column rules are satisfied by construction and
  # only the diagonals are left to test. Generating all n! and filtering is
  # far slower than pruning as you go (it explores arrangements a backtracker
  # would have abandoned at the second queen) but it names what the search
  # space actually is.
  (0...n).to_a.permutation
         .select { |chosen| no_diagonal_clash(chosen) }
         .map { |chosen| chosen.map { |c| "." * c + "Q" + "." * (n - c - 1) } }
end

def no_diagonal_clash(chosen)
  chosen.each_index.to_a.combination(2).all? do |r1, r2|
    (r1 - r2).abs != (chosen[r1] - chosen[r2]).abs
  end
end
