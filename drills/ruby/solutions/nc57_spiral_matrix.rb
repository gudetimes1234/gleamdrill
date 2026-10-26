def spiral_order(matrix)
  # Take the top row, then turn the problem ninety degrees and do it again.
  # Rotating what is left anticlockwise puts the column you would have walked
  # down next along the top, so there is only ever one move to make.
  out = []
  until matrix.empty?
    out.concat(matrix[0])
    matrix = matrix[1..].transpose.reverse
  end
  out
end
