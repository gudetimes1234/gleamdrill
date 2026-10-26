def spiral_order(matrix)
  return [] if matrix.empty?

  # Four boundaries closing in. Each side is walked and then retired, and the
  # two guards below are the ones everybody forgets: on a single remaining row
  # or column the bottom and top edges are the same edge, so walking both
  # would emit it twice.
  top = 0
  bottom = matrix.length - 1
  left = 0
  right = matrix[0].length - 1
  out = []

  while top <= bottom && left <= right
    left.upto(right) { |c| out << matrix[top][c] }
    (top + 1).upto(bottom) { |r| out << matrix[r][right] }
    (right - 1).downto(left) { |c| out << matrix[bottom][c] } if top < bottom
    (bottom - 1).downto(top + 1) { |r| out << matrix[r][left] } if left < right
    top += 1
    bottom -= 1
    left += 1
    right -= 1
  end

  out
end
