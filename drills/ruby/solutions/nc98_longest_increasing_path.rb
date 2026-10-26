def longest_increasing_path(matrix)
  return 0 if matrix.empty? || matrix[0].empty?

  rows = matrix.length
  columns = matrix[0].length
  memo = {}

  # Strictly increasing means the moves can never form a cycle (the grid is
  # a directed acyclic graph) so the longest path from each square is
  # well-defined and can simply be cached. Without that guarantee memoisation
  # would be unsound, which is the fact the problem is really testing.
  longest = lambda do |r, c|
    memo[[r, c]] ||= begin
      best = 1
      [[1, 0], [-1, 0], [0, 1], [0, -1]].each do |dr, dc|
        nr = r + dr
        nc = c + dc
        next unless nr.between?(0, rows - 1) && nc.between?(0, columns - 1)

        best = [best, 1 + longest.(nr, nc)].max if matrix[nr][nc] > matrix[r][c]
      end
      best
    end
  end

  (0...rows).to_a.product((0...columns).to_a).map { |r, c| longest.(r, c) }.max
end
